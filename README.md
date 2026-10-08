Motion Pro V32

Built-in Motion Pro demo remains preview-only and the source textarea starts empty. User-provided HTML motion is required for rendering/export. Added a professional Motion Pro footer with developer/contact/automation text and removed the word “Demo” from the built-in preview project label. Existing rendering, speed, zoom, format, resolution and default settings are preserved.


V30 performance fixes: background-tab preview no longer accumulates a huge catch-up jump; preview is paused during export; rendering yields after every frame so the UI can repaint and Cancel remains responsive; preview resumes from the same timeline after rendering.


V32: Replaced the motion speed slider with six compact buttons: 0.25×, 0.5×, 1×, 1.25×, 1.5× and 2×, with 1× selected by default. Preview playback now uses a lightweight single-step virtual timeline per browser frame instead of replaying every intermediate 60 Hz callback at higher speeds, reducing preview CPU spikes and improving smoothness. Export keeps the deterministic full timeline for frame-accurate rendering. Motion Zoom remains a slider.
