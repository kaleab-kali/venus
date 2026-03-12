import image10 from "@/assets/image-10.jpg"
import image2 from "@/assets/image-2.jpg"
import image6 from "@/assets/image-6.jpg"
import image7 from "@/assets/image-7.jpg"
import image8 from "@/assets/image-8.jpg"
import image11 from "@/assets/image-11.jpg"
import image12 from "@/assets/image-12.jpg"
import video22 from "@/assets/video-22.mp4"
import video26 from "@/assets/video-26.mp4"
import video32 from "@/assets/video-32.mp4"

const IMAGES = [image10, image2, image6, image7, image8, image11, image12] as const
const VIDEOS = [video22, video26, video32] as const

export const preloadAllAssets = () => {
  for (const src of IMAGES) {
    const img = new Image()
    img.src = src
  }

  for (const src of VIDEOS) {
    const link = document.createElement("link")
    link.rel = "preload"
    link.as = "video"
    link.href = src
    document.head.appendChild(link)
  }
}
