const path = require("path");

module.exports = {
  webpack(config, { isServer }) {
    if (isServer) {
      // tinacms-authjs imports tinacms (dead import) which drags in the entire
      // TinaCMS UI bundle (plate-dnd, react-dnd-html5-backend, etc.) — all
      // ESM-only packages that crash Vercel's CJS serverless runtime.
      // Replace it with an empty stub on the server side.
      config.resolve.alias = {
        ...config.resolve.alias,
        // Exact match only — tinacms/dist/client and other subpaths resolve normally
        "tinacms$": path.resolve(__dirname, "server-stubs/tinacms.js"),
      };
    }

    config.module.rules.push({
      test: /\.svg$/i,
      issuer: /\.[jt]sx?$/,
      use: ["@svgr/webpack"],
    });

    return config;
  },
  async rewrites() {
    return [
      {
        source: "/admin",
        destination: "/admin/index.html",
      },
    ];
  },
};
