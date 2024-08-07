import { Fragment, useState, useEffect, ReactNode } from 'react';
import { Dialog, Menu, Transition } from '@headlessui/react';
import {
  BellIcon,
  HomeIcon,
  MenuAlt2Icon,
  ChevronRightIcon,
  XIcon,
} from '@heroicons/react/outline';
import { SearchIcon } from '@heroicons/react/solid';
import { ClipboardListIcon } from '@heroicons/react/solid';
import SubCategory from './SubCategory';
import { Tab, Disclosure } from '@headlessui/react';
import { Link, useStaticQuery, graphql } from 'gatsby';
import { GatsbyImage, IGatsbyImageData } from 'gatsby-plugin-image';
import { ResumeIcon } from 'assets/ResumeIcon';
import { GithubIcon } from 'assets/GithubIcon';
import { MailIcon } from 'assets/MailIcon';
import ScrollProgressBar from './ScrollProgressBar';

type SidebarProps = {
  children: ReactNode;
};

type ProgressBarProps = {
  file1: {
    childImageSharp: {
      gatsbyImageData: IGatsbyImageData;
    };
  };
  file2: {
    childImageSharp: {
      gatsbyImageData: IGatsbyImageData;
    };
  };
};

type SocialProps = {
  site: {
    siteMetadata: {
      author: {
        name: string;
        social: {
          resume: string;
          github: string;
          email: string;
        };
      };
      categories: {
        name: string;
        subCategories: { name: string; href: string }[];
      }[];
    };
  };
};
function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(' ');
}

const Sidebar = ({ children }: SidebarProps) => {
  const {
    file1: {
      childImageSharp: { gatsbyImageData: goal },
    },
    file2: {
      childImageSharp: { gatsbyImageData: profile },
    },
    site: {
      siteMetadata: {
        author: {
          name,
          social: { resume, github, email },
        },
        categories,
      },
    },
  }: ProgressBarProps & SocialProps = useStaticQuery(graphql`
    query getHomeBtnImg {
      file1: file(name: { eq: "goal" }) {
        childImageSharp {
          gatsbyImageData(width: 150)
        }
      }
      file2: file(name: { eq: "profile" }) {
        childImageSharp {
          gatsbyImageData(width: 120, height: 120)
        }
      }
      site: site {
        siteMetadata {
          author {
            name
            social {
              resume
              github
              email
            }
          }
          categories {
            name
            subCategories {
              name
              href
            }
          }
        }
      }
    }
  `);

  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [sidebarForDeskOpen, setSidebarForDeskOpen] = useState(true);

  return (
    <div>
      <Transition.Root show={sidebarOpen} as={Fragment}>
        <Dialog
          as="div"
          className="relative z-40 lg:hidden"
          onClose={setSidebarOpen}
        >
          <Transition.Child
            as={Fragment}
            enter="transition-opacity ease-linear duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="transition-opacity ease-linear duration-300"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-gray-600 bg-opacity-75" />
          </Transition.Child>

          <div className="fixed inset-0 z-40 flex">
            <Transition.Child
              as={Fragment}
              enter="transition ease-in-out duration-300 transform"
              enterFrom="-translate-x-full"
              enterTo="translate-x-0"
              leave="transition ease-in-out duration-300 transform"
              leaveFrom="translate-x-0"
              leaveTo="-translate-x-full"
            >
              <Dialog.Panel className="relative flex flex-col flex-1 w-full max-w-xs pt-5 pb-4 bg-white">
                <Transition.Child
                  as={Fragment}
                  enter="ease-in-out duration-300"
                  enterFrom="opacity-0"
                  enterTo="opacity-100"
                  leave="ease-in-out duration-300"
                  leaveFrom="opacity-100"
                  leaveTo="opacity-0"
                >
                  <div className="absolute top-0 right-0 pt-2 -mr-12">
                    <button
                      type="button"
                      className="items-center justify-center hidden w-10 h-10 -ml-24 rounded-full md:flex focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white"
                      onClick={() => setSidebarOpen(false)}
                    >
                      <span className="sr-only">Close sidebar</span>
                      <XIcon
                        className="w-6 h-6 text-black"
                        aria-hidden="true"
                      />
                    </button>
                  </div>
                </Transition.Child>
                <div className="flex flex-col items-center w-full px-4 mt-10">
                  <Link to="/">
                    <GatsbyImage
                      className="w-20 h-20 mb-3 rounded-md"
                      image={profile}
                      alt="profile"
                    />
                  </Link>
                  <div className="mb-6 font-bold text-slate-900 text-md">
                    {name}
                  </div>
                  <div className="flex space-x-6">
                    <Link to={resume} target="_blank">
                      <ResumeIcon />
                    </Link>
                    <Link to={github} target="_blank">
                      <GithubIcon />
                    </Link>
                    <Link to={`mailto:${email}`}>
                      <MailIcon />
                    </Link>
                  </div>
                </div>
                {/*  SubNav -> */}
                <div className="w-full px-5 pt-12">
                  {categories.map(({ name: category, subCategories }) => (
                    <Disclosure key={category}>
                      {({ open }) => (
                        <Fragment>
                          <Disclosure.Button className="flex justify-between w-full px-4 py-2 mt-1 text-sm font-medium text-left ui-not-open:rounded-md ui-open:rounded-t-md text-slate-900 hover:bg-slate-200 ui-not-open:bg-white">
                            <span>{category}</span>
                            <ChevronRightIcon
                              className={`${
                                open ? 'rotate-90 transform' : ''
                              } h-5 w-5 text-slate-500`}
                            />
                          </Disclosure.Button>
                          <Tab.Group vertical>
                            <div className="ml-4 border-l-2">
                              {subCategories.map(subCategory => (
                                <Disclosure.Panel key={subCategory.name}>
                                  <Link to={subCategory.href}>
                                    <Tab
                                      key={subCategory.name}
                                      className={({ selected }) =>
                                        classNames(
                                          selected
                                            ? 'text-slate-600 font-bold'
                                            : 'text-slate-400 hover:bg-slate-200 font-medium',
                                          'w-full group flex items-center px-4 py-2 text-sm',
                                        )
                                      }
                                    >
                                      {subCategory.name}
                                    </Tab>
                                  </Link>
                                </Disclosure.Panel>
                              ))}
                            </div>
                          </Tab.Group>
                        </Fragment>
                      )}
                    </Disclosure>
                  ))}
                </div>
                {/* <- SubNav */}
              </Dialog.Panel>
            </Transition.Child>
            <div className="flex-shrink-0 w-14" aria-hidden="true">
              {/* Dummy element to force sidebar to shrink to fit close icon */}
            </div>
          </div>
        </Dialog>
      </Transition.Root>

      {/* Static sidebar for desktop */}
      <div
        className={`hidden ${
          sidebarForDeskOpen
            ? 'z-40 lg:flex lg:w-64 lg:flex-col lg:fixed lg:inset-y-0'
            : ''
        }`}
      >
        <div className="absolute top-0 right-0 pt-2 -mr-12">
          <button
            type="button"
            className="-ml-[90px] flex items-center justify-center h-8 w-8 rounded-full focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white"
            onClick={() => setSidebarForDeskOpen(false)}
          >
            <span className="sr-only">Close sidebar</span>
            <XIcon className="w-6 h-6 text-black" aria-hidden="true" />
          </button>
        </div>
        {/* Sidebar component, swap this element with another sidebar if you like */}
        <div className="flex flex-col flex-grow overflow-y-auto bg-white shadow-lg shadow-slate-200">
          <div className="flex flex-col items-center w-full px-4 mt-14 ">
            <Link to="/">
              <GatsbyImage
                className="w-20 h-20 mb-3 rounded-md"
                image={profile}
                alt="profile"
              />
            </Link>
            <div className="mb-5 font-bold text-slate-900 text-md">{name}</div>
            <div className="flex space-x-6">
              <Link to={resume} target="_blank">
                <ResumeIcon />
              </Link>
              <Link to={github} target="_blank">
                <GithubIcon />
              </Link>
              <Link to={`mailto:${email}`}>
                <MailIcon />
              </Link>
            </div>
          </div>
          {/*  SubNav -> */}
          <div className="w-full px-3 pt-8">
            {categories.map(({ name: category, subCategories }) => (
              <Disclosure key={category}>
                {({ open }) => (
                  <Fragment>
                    <Disclosure.Button className="flex justify-between w-full px-4 py-2 mt-1 text-sm font-medium text-left ui-not-open:rounded-md ui-open:rounded-t-md text-slate-900 hover:bg-slate-200">
                      <span>{category}</span>
                      <ChevronRightIcon
                        className={`${
                          open ? 'rotate-90 transform' : ''
                        } h-5 w-5 text-slate-500`}
                      />
                    </Disclosure.Button>
                    <Tab.Group vertical>
                      <div className="ml-4 border-l-2">
                        {subCategories &&
                          subCategories.map(subCategory => (
                            <Disclosure.Panel key={subCategory.name}>
                              <Link to={subCategory.href}>
                                <Tab
                                  key={subCategory.name}
                                  className={({ selected }) =>
                                    classNames(
                                      selected
                                        ? 'text-slate-600 font-extrabold'
                                        : 'text-slate-400 hover:bg-slate-200 font-medium',
                                      'w-full group flex items-center px-4 py-2 text-sm',
                                    )
                                  }
                                >
                                  {subCategory.name}
                                </Tab>
                              </Link>
                            </Disclosure.Panel>
                          ))}
                      </div>
                    </Tab.Group>
                  </Fragment>
                )}
              </Disclosure>
            ))}
          </div>
          {/* <- SubNav */}
        </div>
      </div>

      <div
        className={` ${
          sidebarForDeskOpen ? 'lg:pl-64' : ''
        } flex flex-col flex-1`}
      >
        <div className="sticky top-0 z-10 flex flex-shrink-0 h-12 bg-white shadow">
          <button
            type="button"
            className="px-4 text-gray-500 border-r border-gray-200 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500 lg:hidden"
            onClick={() => setSidebarOpen(true)}
          >
            <span className="sr-only">Open sidebar</span>
            <MenuAlt2Icon className="w-6 h-6" aria-hidden="true" />
          </button>
          <button
            type="button"
            className={`px-4 border-r border-gray-200 text-gray-500 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500 hidden ${
              sidebarForDeskOpen ? '' : 'lg:block'
            }`}
            onClick={() => setSidebarForDeskOpen(true)}
          >
            <span className="sr-only">Open sidebar</span>
            <MenuAlt2Icon className="w-6 h-6" aria-hidden="true" />
          </button>
          <ScrollProgressBar />
          <Link className="flex items-end h-full" to="/">
            <GatsbyImage
              className="w-16 mr-2 -ml-4 drop-shadow-md"
              image={goal}
              alt="Progress Image"
            />
          </Link>
        </div>

        <main>
          {/* content */}
          {children}
          {/* End content */}
        </main>
      </div>
    </div>
  );
};

export default Sidebar;
