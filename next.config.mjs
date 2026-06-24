import createMDX from "@next/mdx";

// Compile MDX with the stable automatic JSX runtime (jsx, not jsxDEV).
// The dev runtime's owner-stack tracking reads React internals that get
// split across Next's RSC react aliasing, crashing the server render
// ("Cannot read properties of undefined (reading 'recentlyCreatedOwnerStacks')").
const withMDX = createMDX({
  options: {
    development: false,
  },
});

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
};

export default withMDX(nextConfig);
