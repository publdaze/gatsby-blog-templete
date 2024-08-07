import { graphql, useStaticQuery } from 'gatsby';
import React, { FunctionComponent } from 'react';

const Footer: FunctionComponent = function () {
  const {
    site: {
      siteMetadata: {
        author: { name },
      },
    },
  }: {
    site: {
      siteMetadata: {
        author: { name: string };
      };
    };
  } = useStaticQuery(graphql`
    query getName {
      site {
        siteMetadata {
          author {
            name
          }
        }
      }
    }
  `);

  return (
    // FooterWrapper
    <footer className="grid p-12 mt-auto text-xs leading-6 text-center text-gray-600 place-items-center md:text-sm">
      Thank You for Visiting My Blog, Have a Good Day 😆
      <br />© {new Date().getFullYear()} {name}, Powered By Gatsby.
    </footer>
  );
};

export default Footer;
