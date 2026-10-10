Motion Pro V38

V38 update: New, Save Project, and Open Project now use the same purple gradient sampled from the Motion Pro M logo. Added a top-right theme toggle with a sun icon in the default Light Mode and a moon icon in Dark Mode. The theme toggle switches immediately and is keyboard-accessible. Light Mode has high-contrast text and light surfaces across the app; Dark Mode preserves the original dark interface. Light Mode is always the default on page load. Existing preview, project, motion speed, zoom, export and rendering behavior is preserved.

Built-in Motion Pro demo remains preview-only and the source textarea starts empty. User-provided HTML motion is required for rendering/export. Rendering is local in the browser.

V30 performance fixes: background-tab preview no longer accumulates a huge catch-up jump; preview is paused during export; rendering yields after every frame so the UI can repaint and Cancel remains responsive; preview resumes from the same timeline after rendering.

Motion speed options: 0.25×, 0.5×, 1×, 1.25×, 1.5× and 2×, with 1× selected by default. Motion Zoom remains a slider.

Responsive layout for desktop, tablet, and mobile. Output settings and render engine are unchanged.


V38 update: removed the light/dark mode toggle and restored the original dark-only interface. The three project buttons retain the M-logo purple gradient; all other features are unchanged.


V38 adds Video Adjustment controls below Motion Speed and Motion Zoom: 360-degree rotation, fine 2px directional position nudges, reset, and adjustment values saved in project files. Adjustments are applied to preview and render.


V38 UI refinement: ROTATION label now matches MOTION SPEED sizing, POSITION is larger and centered below the zoom control on narrow layouts / in the right adjustment column on desktop, and Reset adjustment uses a clear purple high-contrast button. Existing adjustment behavior is unchanged.

## V39 render adjustment fix
- Fixed export adjustment state so frame-by-frame animation seeking no longer resets ROTATION and POSITION to zero.
- Changed render capture to capture the transformed body rather than the transformed HTML root, allowing html2canvas to include the transform in exported frames.
- Applied to MOV, MP4, and WebM rendering paths without changing export format/settings defaults.
