import React, { FunctionComponent } from 'react';
import { IGatsbyImageData } from 'gatsby-plugin-image';
import ProfileImage from 'components/Main/ProfileImage';

type IntroductionProps = {
  profileImage: IGatsbyImageData;
  introduction: {
    sub: string;
    main: { start: ``; highlight: ``; end: `` };
  };
};

const Introduction: FunctionComponent<IntroductionProps> = function ({
  profileImage,
  introduction: { sub, main },
}) {
  return (
    // Background
    <div className="w-full text-white bg-gradient-to-bl from-gray-700 via-gray-900 to-black">
      {/* // Wrapper */}
      <div className="flex flex-col justify-center items-start w-full h-72 md:w-[725px] lg:w-[840px] md:h-96 m-auto px-5 md:px-0">
        <ProfileImage profileImage={profileImage} />

        <div>
          {/* // SubTitle */}
          <div className="text-sm font-semibold md:text-xl">{sub}</div>
          {/* // Title */}
          <div className="flex flex-wrap mt-1 text-2xl font-semibold whitespace-pre md:text-3xl">
            {main.start}
            <div className="text-blue-300 "> {main.highlight} </div>
            {main.end}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Introduction;
