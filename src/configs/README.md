# Configuration

This directory contains configuration files for the AI-Powered Social Learning Platform.

## Directory Structure

- `navigation/` - Navigation configuration
  - `vertical/` - Vertical navigation configuration
  - `horizontal/` - Horizontal navigation configuration (if needed)
- `theme.ts` - Theme configuration
- `i18n.ts` - Internationalization configuration
- `constants.ts` - Application constants

## Implementation Notes

- Navigation configuration is adapted from Materio's navigation data
- Theme configuration is adapted from Materio's theme
- Internationalization uses next-international
- Constants include API endpoints, feature flags, and other configuration values

## References

- [Detailed Technical Specification (v0.1)](../../Detailed%20Technical%20Specification%20(v0.1).md) - Section 2: Proposed File & Directory Structure
- [Materio UI Demo](../../materio-mui-demo/src/data/navigation) - Original navigation data
