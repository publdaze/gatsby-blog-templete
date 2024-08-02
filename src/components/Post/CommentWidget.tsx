import { graphql, useStaticQuery } from 'gatsby';
import React, { createRef, FunctionComponent, useEffect } from 'react';

const src = 'https://utteranc.es/client.js';

type CommentWidgetProps = {
  site: {
    siteMetadata: {
      comments: {
        utterances: { repo: string };
      };
    };
  };
};

type UtterancesAttributesType = {
  src: string;
  repo: string;
  'issue-term': string;
  label: string;
  theme: string;
  crossorigin: string;
  async: string;
};

const CommentWidget: FunctionComponent = function () {
  const {
    site: {
      siteMetadata: {
        comments: {
          utterances: { repo },
        },
      },
    },
  }: CommentWidgetProps = useStaticQuery(graphql`
    query getComments {
      site {
        siteMetadata {
          comments {
            utterances {
              repo
            }
          }
        }
      }
    }
  `);

  const element = createRef<HTMLDivElement>();

  useEffect(() => {
    if (element.current === null) return;

    const utterances: HTMLScriptElement = document.createElement('script');

    const attributes: UtterancesAttributesType = {
      src,
      repo,
      'issue-term': 'pathname',
      label: 'Comment',
      theme: `github-light`,
      crossorigin: 'anonymous',
      async: 'true',
    };

    Object.entries(attributes).forEach(([key, value]) => {
      utterances.setAttribute(key, value);
    });

    element.current.appendChild(utterances);
  }, []);

  return (
    <div
      className="py-0 px-5 md:p-0  md:w-[725px] lg:w-[840px] mx-auto"
      ref={element}
    />
  );
};

export default CommentWidget;
