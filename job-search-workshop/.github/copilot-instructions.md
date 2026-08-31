---
description: "Workspace conventions for intentional, accessible Fluent UI experiences and component reuse. Use when creating or modifying UI."
applyTo: "apps/web/**"
---

# UI Development Instructions

## Design System And Dependencies

- Use Fluent UI for all UI work. Prefer the installed Fluent UI components, tokens, typography, icons, layout primitives, and accessibility patterns over custom equivalents.
- ShadCN UI is an approved component-library option when it complements the existing Fluent UI implementation. Do not add, replace, or introduce any other component library without explicit user approval first.
- Before adding a package, confirm that the required capability is not already available through the existing dependencies, Fluent UI, or a reusable local component.
- Do not duplicate components. Search for an existing component or pattern first, and extend or compose it when appropriate.
- Keep components DRY: centralize shared behavior, styling, and repeated UI structures. Do not create abstractions until a second concrete use case proves they are needed (YAGNI).

## Intentional UI Design

- Build the usable product workflow as the first screen, not a marketing or explanatory landing page.
- Design for the application's actual users and repeated workflows. Favor clear hierarchy, scannable information, predictable navigation, and efficient primary actions.
- Match existing visual conventions before introducing new patterns. Use a small, intentional set of design tokens for color, spacing, type, borders, and elevation.
- Avoid generic AI-generated UI: oversized hero copy, decorative gradients or blobs, arbitrary cards, excessive badges, ornamental icons, and visually noisy dashboards.
- Do not nest cards or render entire page sections as floating cards. Use cards only for repeated items, dialogs, or tools that genuinely need a boundary.
- Use no more UI chrome than the task requires. Prefer content, data, and meaningful controls over decorative surface area.
- Use familiar icons for compact tool actions and provide tooltips for icons whose purpose is not obvious. Prefer Fluent UI icons.
- Use controls that match the interaction: toggles or checkboxes for binary settings, menus for option sets, tabs for peer views, inputs or steppers for numeric values, and icon buttons for compact actions.

## Layout, Responsiveness, And Accessibility

- Add a floating footer to every window or page. It must remain visible without obscuring interactive or scrollable content, and its height must be accounted for in page padding.
- Place dialog action buttons in the bottom-right corner. Order actions consistently with the existing application convention and make the primary action visually clear.
- Use responsive constraints for layouts and fixed-format controls so text, loading states, and dynamic content do not shift or overlap the interface.
- Verify desktop and mobile layouts. Text must wrap, truncate, or resize appropriately; no text or controls may overflow, overlap, or become unreachable.
- Use semantic HTML and Fluent UI accessibility support. Every interactive control needs an accessible name, keyboard operation, visible focus, and sufficient contrast.
- Make loading, empty, error, disabled, and success states explicit for user-facing workflows.

## Implementation And Validation

- Reuse shared tokens and components rather than copying CSS or JSX. Keep styles local to the component unless they are genuinely shared.
- Do not hand-draw SVG icons when an equivalent Fluent UI icon exists.
- Do not introduce UI dependencies, design-system replacements, or broad visual rewrites without asking for permission and explaining the tradeoff.
- When changing UI, validate the relevant tests and inspect the rendered experience at desktop and mobile sizes when the environment supports it.