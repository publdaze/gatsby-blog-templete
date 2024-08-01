import React, {
  FunctionComponent,
  useState,
  useCallback,
  useEffect,
} from 'react';
import { useStaticQuery, graphql } from 'gatsby';
import { Link } from 'gatsby';
import { GatsbyImage, IGatsbyImageData } from 'gatsby-plugin-image';

type ProgressBarProps = {
  file: {
    childImageSharp: {
      gatsbyImageData: IGatsbyImageData;
    };
  };
};

const ScrollProgressBar: FunctionComponent = () => {
  const {
    file: {
      childImageSharp: { gatsbyImageData: progress },
    },
  }: ProgressBarProps = useStaticQuery(graphql`
    query getProgressBarImg {
      file(name: { eq: "progress" }) {
        childImageSharp {
          gatsbyImageData(height: 100)
        }
      }
    }
  `);

  const [width, setWidth] = useState<number>(0);

  const handleScroll = useCallback((): void => {
    const { scrollTop, scrollHeight, clientHeight } = document.documentElement;

    if (scrollTop === 0) {
      setWidth(0);
      return;
    }

    const windowHeight: number = scrollHeight - clientHeight;
    const currentPercent: number = scrollTop / windowHeight;

    setWidth(currentPercent * 100);
  }, []);

  useEffect(() => {
    window.addEventListener('scroll', handleScroll, true);

    return () => {
      window.removeEventListener('scroll', handleScroll, true);
    };
  }, [handleScroll]);

  return (
    <div className="flex flex-1">
      <Link
        className="flex items-center"
        to="" /* TODO */
        style={{ marginLeft: `${width}%` }}
      >
        <GatsbyImage
          className={`${
            width < 98 ? 'w-8' : `w-${100 - width}`
          } drop-shadow-md`}
          image={progress}
          alt="Progress Image"
        />
      </Link>
    </div>
  );
};

export default ScrollProgressBar;
