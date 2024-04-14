// packages/create-analog/template-blog/vite.config.ts
import { defineConfig } from "file:///Users/robertsbt/projects/analogjs/analog/node_modules/.pnpm/vite@5.0.11_@types+node@18.19.15_less@4.1.3_stylus@0.59.0/node_modules/vite/dist/node/index.js";
import analog from "file:///Users/robertsbt/projects/analogjs/analog/node_modules/.pnpm/@analogjs+platform@1.0.2_@angular-devkit+build-angular@17.2.0_@nx+devkit@18.0.4_@nx+vite@18.0.4/node_modules/@analogjs/platform/src/index.js";
var vite_config_default = defineConfig(({ mode }) => ({
  publicDir: "src/assets",
  build: {
    target: ["es2020"]
  },
  resolve: {
    mainFields: ["module"]
  },
  plugins: [
    analog({
      prerender: {
        routes: ["/blog", "/blog/2022-12-27-my-first-post"]
      }
    })
  ],
  test: {
    globals: true,
    environment: "jsdom",
    setupFiles: ["src/test.ts"],
    include: ["**/*.spec.ts"],
    reporters: ["default"]
  },
  define: {
    "import.meta.vitest": mode !== "production"
  }
}));
export {
  vite_config_default as default
};
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsicGFja2FnZXMvY3JlYXRlLWFuYWxvZy90ZW1wbGF0ZS1ibG9nL3ZpdGUuY29uZmlnLnRzIl0sCiAgInNvdXJjZXNDb250ZW50IjogWyJjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfZGlybmFtZSA9IFwiL1VzZXJzL3JvYmVydHNidC9wcm9qZWN0cy9hbmFsb2dqcy9hbmFsb2cvcGFja2FnZXMvY3JlYXRlLWFuYWxvZy90ZW1wbGF0ZS1ibG9nXCI7Y29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2ZpbGVuYW1lID0gXCIvVXNlcnMvcm9iZXJ0c2J0L3Byb2plY3RzL2FuYWxvZ2pzL2FuYWxvZy9wYWNrYWdlcy9jcmVhdGUtYW5hbG9nL3RlbXBsYXRlLWJsb2cvdml0ZS5jb25maWcudHNcIjtjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfaW1wb3J0X21ldGFfdXJsID0gXCJmaWxlOi8vL1VzZXJzL3JvYmVydHNidC9wcm9qZWN0cy9hbmFsb2dqcy9hbmFsb2cvcGFja2FnZXMvY3JlYXRlLWFuYWxvZy90ZW1wbGF0ZS1ibG9nL3ZpdGUuY29uZmlnLnRzXCI7Ly8vIDxyZWZlcmVuY2UgdHlwZXM9XCJ2aXRlc3RcIiAvPlxuXG5pbXBvcnQgeyBkZWZpbmVDb25maWcgfSBmcm9tICd2aXRlJztcbmltcG9ydCBhbmFsb2cgZnJvbSAnQGFuYWxvZ2pzL3BsYXRmb3JtJztcblxuLy8gaHR0cHM6Ly92aXRlanMuZGV2L2NvbmZpZy9cbmV4cG9ydCBkZWZhdWx0IGRlZmluZUNvbmZpZygoeyBtb2RlIH0pID0+ICh7XG4gIHB1YmxpY0RpcjogJ3NyYy9hc3NldHMnLFxuICBidWlsZDoge1xuICAgIHRhcmdldDogWydlczIwMjAnXSxcbiAgfSxcbiAgcmVzb2x2ZToge1xuICAgIG1haW5GaWVsZHM6IFsnbW9kdWxlJ10sXG4gIH0sXG4gIHBsdWdpbnM6IFtcbiAgICBhbmFsb2coe1xuICAgICAgcHJlcmVuZGVyOiB7XG4gICAgICAgIHJvdXRlczogWycvYmxvZycsICcvYmxvZy8yMDIyLTEyLTI3LW15LWZpcnN0LXBvc3QnXSxcbiAgICAgIH0sXG4gICAgfSksXG4gIF0sXG4gIHRlc3Q6IHtcbiAgICBnbG9iYWxzOiB0cnVlLFxuICAgIGVudmlyb25tZW50OiAnanNkb20nLFxuICAgIHNldHVwRmlsZXM6IFsnc3JjL3Rlc3QudHMnXSxcbiAgICBpbmNsdWRlOiBbJyoqLyouc3BlYy50cyddLFxuICAgIHJlcG9ydGVyczogWydkZWZhdWx0J10sXG4gIH0sXG4gIGRlZmluZToge1xuICAgICdpbXBvcnQubWV0YS52aXRlc3QnOiBtb2RlICE9PSAncHJvZHVjdGlvbicsXG4gIH0sXG59KSk7XG4iXSwKICAibWFwcGluZ3MiOiAiO0FBRUEsU0FBUyxvQkFBb0I7QUFDN0IsT0FBTyxZQUFZO0FBR25CLElBQU8sc0JBQVEsYUFBYSxDQUFDLEVBQUUsS0FBSyxPQUFPO0FBQUEsRUFDekMsV0FBVztBQUFBLEVBQ1gsT0FBTztBQUFBLElBQ0wsUUFBUSxDQUFDLFFBQVE7QUFBQSxFQUNuQjtBQUFBLEVBQ0EsU0FBUztBQUFBLElBQ1AsWUFBWSxDQUFDLFFBQVE7QUFBQSxFQUN2QjtBQUFBLEVBQ0EsU0FBUztBQUFBLElBQ1AsT0FBTztBQUFBLE1BQ0wsV0FBVztBQUFBLFFBQ1QsUUFBUSxDQUFDLFNBQVMsZ0NBQWdDO0FBQUEsTUFDcEQ7QUFBQSxJQUNGLENBQUM7QUFBQSxFQUNIO0FBQUEsRUFDQSxNQUFNO0FBQUEsSUFDSixTQUFTO0FBQUEsSUFDVCxhQUFhO0FBQUEsSUFDYixZQUFZLENBQUMsYUFBYTtBQUFBLElBQzFCLFNBQVMsQ0FBQyxjQUFjO0FBQUEsSUFDeEIsV0FBVyxDQUFDLFNBQVM7QUFBQSxFQUN2QjtBQUFBLEVBQ0EsUUFBUTtBQUFBLElBQ04sc0JBQXNCLFNBQVM7QUFBQSxFQUNqQztBQUNGLEVBQUU7IiwKICAibmFtZXMiOiBbXQp9Cg==
