module.exports = {
  module: {
    rules: [
      { test: /\.css$/, use: "css-loader" },
      { test: /\.ts$/, use: "ts-loader" },
      { test: /\.less$/, use: "less-loader" },
    ],
    use: [
      {
        loader: "@svgr/webpack",
        options: {
          babel: false,
          icon: true,
        },
      },
    ],
  },
};
