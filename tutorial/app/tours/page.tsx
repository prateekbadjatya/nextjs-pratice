import Image from "next/image";
import Link from "next/link";
import React from "react";

const url = "https://www.course-api.com/react-tours-project";

type Tour = {
  id: string;
  name: string;
  info: string;
  image: string;
  price: string;
};

const fetchTours = async () => {
  await new Promise((resolve) => setTimeout(resolve, 3000));
  const response = await fetch(url);
  const data: Tour[] = await response.json();
  return data;
};

const ToursPage = async () => {
  const data = await fetchTours();
  return (
    <div className="grid md:grid-cols-2 gap-8">
      {data.map((tour) => {
        return (
          <Link
            key={tour.id}
            href={`/tours/${tour.id}`}
            className="hover:text-blue-500"
          >
            <div className="relative h-48 mb-2">
              <Image
                src={tour.image}
                alt={tour.name}
                fill
                
                sizes="33vw"
                // sizes='(max-width:768px) 100vw,(max-width:1200px) 50vw, 33vw'
                priority
                className="object-cover rounded"
              />
            </div>
            <h2>{tour.name}</h2>
          </Link>
        );
      })}
    </div>
  );
};

export default ToursPage;

// - Since Next.js does not have access to remote files during the build process, you'll need to provide the width, height and optional blurDataURL props manually.

// - The width and height attributes are used to infer the correct aspect ratio of image and avoid layout shift from the image loading in. The width and height do not determine the rendered size of the image file.


// - The fill prop allows your image to be sized by its parent element
// - sizes property helps the browser select the most appropriate image size to load based on the user's device and screen size, improving website performance and user experience.

// A string that provides information about how wide the image will be at different breakpoints. The value of sizes will greatly affect performance for images using fill or which are styled to have a responsive size.

// The sizes property serves two important purposes related to image performance:

// First, the value of sizes is used by the browser to determine which size of the image to download, from next/image's automatically-generated source set. When the browser chooses, it does not yet know the size of the image on the page, so it selects an image that is the same size or larger than the viewport. The sizes property allows you to tell the browser that the image will actually be smaller than full screen. If you don't specify a sizes value in an image with the fill property, a default value of 100vw (full screen width) is used.

// Second, the sizes property configures how next/image automatically generates an image source set. If no sizes value is present, a small source set is generated, suitable for a fixed-size image. If sizes is defined, a large source set is generated, suitable for a responsive image. If the sizes property includes sizes such as 50vw, which represent a percentage of the viewport width, then the source set is trimmed to not include any values which are too small to ever be necessary.