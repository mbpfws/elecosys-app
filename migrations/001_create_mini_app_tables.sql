-- Create mini_app_results table
CREATE TABLE IF NOT EXISTS public.mini_app_results (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  app_name TEXT NOT NULL,
  task_type TEXT,
  prompt TEXT,
  user_answer TEXT,
  ai_response JSONB,
  base_score NUMERIC,
  evaluation_score JSONB,
  skill_type TEXT,
  level INTEGER,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Create adaptive_test_sessions table
CREATE TABLE IF NOT EXISTS public.adaptive_test_sessions (
  id UUID PRIMARY KEY,
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  state JSONB NOT NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Create adaptive_test_questions table
CREATE TABLE IF NOT EXISTS public.adaptive_test_questions (
  id UUID PRIMARY KEY,
  session_id UUID NOT NULL REFERENCES public.adaptive_test_sessions(id) ON DELETE CASCADE,
  question JSONB NOT NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Create adaptive_test_answers table
CREATE TABLE IF NOT EXISTS public.adaptive_test_answers (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  question_id UUID NOT NULL REFERENCES public.adaptive_test_questions(id) ON DELETE CASCADE,
  session_id UUID NOT NULL REFERENCES public.adaptive_test_sessions(id) ON DELETE CASCADE,
  user_answer TEXT NOT NULL,
  is_correct BOOLEAN NOT NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Create editable_prompts table
CREATE TABLE IF NOT EXISTS public.editable_prompts (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  category TEXT NOT NULL,
  content TEXT NOT NULL,
  is_active BOOLEAN NOT NULL DEFAULT true,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Add RLS policies
ALTER TABLE public.mini_app_results ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.adaptive_test_sessions ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.adaptive_test_questions ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.adaptive_test_answers ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.editable_prompts ENABLE ROW LEVEL SECURITY;

-- Users can only see their own results
CREATE POLICY "Users can view their own results" ON public.mini_app_results
  FOR SELECT USING (auth.uid() = user_id);

-- Users can only insert their own results
CREATE POLICY "Users can insert their own results" ON public.mini_app_results
  FOR INSERT WITH CHECK (auth.uid() = user_id);

-- Users can only see their own sessions
CREATE POLICY "Users can view their own sessions" ON public.adaptive_test_sessions
  FOR SELECT USING (auth.uid() = user_id);

-- Users can only insert their own sessions
CREATE POLICY "Users can insert their own sessions" ON public.adaptive_test_sessions
  FOR INSERT WITH CHECK (auth.uid() = user_id);

-- Users can only update their own sessions
CREATE POLICY "Users can update their own sessions" ON public.adaptive_test_sessions
  FOR UPDATE USING (auth.uid() = user_id);

-- Users can only see questions from their own sessions
CREATE POLICY "Users can view questions from their own sessions" ON public.adaptive_test_questions
  FOR SELECT USING (
    session_id IN (
      SELECT id FROM public.adaptive_test_sessions WHERE user_id = auth.uid()
    )
  );

-- Users can only insert questions for their own sessions
CREATE POLICY "Users can insert questions for their own sessions" ON public.adaptive_test_questions
  FOR INSERT WITH CHECK (
    session_id IN (
      SELECT id FROM public.adaptive_test_sessions WHERE user_id = auth.uid()
    )
  );

-- Users can only see answers from their own sessions
CREATE POLICY "Users can view answers from their own sessions" ON public.adaptive_test_answers
  FOR SELECT USING (
    session_id IN (
      SELECT id FROM public.adaptive_test_sessions WHERE user_id = auth.uid()
    )
  );

-- Users can only insert answers for their own sessions
CREATE POLICY "Users can insert answers for their own sessions" ON public.adaptive_test_answers
  FOR INSERT WITH CHECK (
    session_id IN (
      SELECT id FROM public.adaptive_test_sessions WHERE user_id = auth.uid()
    )
  );

-- Everyone can view active prompts
CREATE POLICY "Everyone can view active prompts" ON public.editable_prompts
  FOR SELECT USING (is_active = true);

-- Only admins can manage prompts
CREATE POLICY "Admins can manage prompts" ON public.editable_prompts
  USING (
    auth.uid() IN (
      SELECT id FROM auth.users WHERE auth.users.raw_app_meta_data->>'role' = 'admin'
    )
  );

-- Insert default prompts
INSERT INTO public.editable_prompts (name, category, content, is_active)
VALUES
  ('IELTS Writing Task 1 Prompt', 'writing-tools', 'You are an IELTS examiner. Generate a Task 1 writing prompt with a chart or graph description. The prompt should be challenging but fair for a test-taker aiming for Band 7 or higher.', true),
  ('IELTS Writing Task 2 Prompt', 'writing-tools', 'You are an IELTS examiner. Generate a Task 2 writing prompt on a contemporary issue. The prompt should be suitable for academic IELTS and require the test-taker to present and justify an opinion.', true),
  ('IELTS Writing Analysis', 'writing-tools', 'You are an IELTS examiner. Analyze the following essay based on the IELTS criteria: Task Achievement, Coherence and Cohesion, Lexical Resource, and Grammatical Range and Accuracy. Provide a band score for each criterion and an overall band score. Include specific feedback for improvement.', true),
  ('Reading Question Generator', 'adaptive-test', 'Generate a reading comprehension question at {difficulty} level. The question should be multiple choice with 4 options, only one of which is correct. Return the question in JSON format with fields for question text, options array, and correct answer index.', true),
  ('Grammar Question Generator', 'adaptive-test', 'Generate a grammar question at {difficulty} level. The question should be multiple choice with 4 options, only one of which is correct. Return the question in JSON format with fields for question text, options array, and correct answer index.', true),
  ('Vocabulary Question Generator', 'adaptive-test', 'Generate a vocabulary question at {difficulty} level. The question should be multiple choice with 4 options, only one of which is correct. Return the question in JSON format with fields for question text, options array, and correct answer index.', true),
  ('AI Tutor System Prompt', 'chat', 'You are an AI English tutor specializing in IELTS preparation. Your role is to help students improve their English skills and prepare for the IELTS exam. You can provide explanations, examples, and guidance on grammar, vocabulary, writing, reading, listening, and speaking. Be friendly, encouraging, and provide clear, concise explanations.', true);
