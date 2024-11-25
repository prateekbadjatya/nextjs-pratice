import Image from "next/image";
import pandaImage from "@/images/panda.png";
const page = ({ params }: { params: { id: string } }) => {
  console.log(params);

  return (
    <>
      <h1 className="text-4xl">ID : {params.id}</h1>
      <section className="flex gap-x-4 mt-4">
        <div>
          <Image
            src={pandaImage}
            alt="maps"
            width={192}
            priority
            height={192}
            className="w-48 h-48 object-cover rounded"
          />
          <h2>local image</h2>
        </div>
      </section>
    </>
  );
};
export default page;

// The Next.js Image component extends the HTML <img> element with features for automatic image optimization:

// - Size Optimization: Automatically serve correctly sized images for each device, using modern image formats like WebP and AVIF.
// - Visual Stability: Prevent layout shift automatically when images are loading.
// - Faster Page Loads: Images are only loaded when they enter the viewport using native browser lazy loading, with optional blur-up placeholders.
// - Asset Flexibility: On-demand image resizing, even for images stored on remote servers

// - disable cache
// - width and height

// - priority property to prioritize the image for loading
//   When true, the image will be considered high priority and preload.
