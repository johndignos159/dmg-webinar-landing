# Media folder

Drag images and videos into the folders here. Anything in `public/` is served
by the website at the matching URL path.

```
public/
  images/    <- photos, logos, graphics
  videos/    <- video files
  dmg-mark.png
```

## How the path works

Drop the file in, then drop `public` from the path. That's the URL.

| File you drag in                  | Use this in the code |
| --------------------------------- | -------------------- |
| `public/images/speaker.jpg`       | `/images/speaker.jpg` |
| `public/images/truck-hero.png`    | `/images/truck-hero.png` |
| `public/videos/webinar-promo.mp4` | `/videos/webinar-promo.mp4` |

Example:

```tsx
<Image src="/images/speaker.jpg" alt="Speaker" width={400} height={400} />
```

## Naming

Use lowercase with dashes, no spaces: `truck-hero.jpg`, not `Truck Hero (1).jpg`.
Spaces and parentheses work locally on Windows but break on the Linux servers
Vercel deploys to. This is the single most common cause of "image works on my
machine, broken on the live site."

## Size limits — read before adding video

Every file here gets committed to git and shipped in each deploy.

- **Over 50 MB**: GitHub warns.
- **Over 100 MB**: GitHub rejects the push outright. Your deploy stops.
- Large files stay in git history permanently, even after deletion, and slow
  every future clone and build.

Images are fine — keep them under ~1 MB each. Export JPGs at 80% quality and
size them to roughly what the page displays, not straight off the camera.

**Video does not belong here.** A one-minute 1080p clip is typically 30-60 MB.
Upload to YouTube, Vimeo, or Cloudinary and embed the player instead. You get
streaming, adaptive quality, and mobile handling for free, and your repo stays
small. The `videos/` folder is here for short background loops only — think a
5-second silent MP4 under 5 MB.
