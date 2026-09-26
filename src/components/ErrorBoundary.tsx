import { Component, ErrorInfo, ReactNode } from "react";

interface Props {
  children: ReactNode;
}

interface State {
  hasError: boolean;
}

class ErrorBoundary extends Component<Props, State> {
  state: State = { hasError: false };

  static getDerivedStateFromError(): State {
    return { hasError: true };
  }

  componentDidCatch(error: Error, info: ErrorInfo) {
    console.error("Uncaught error:", error, info.componentStack);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div
          style={{
            minHeight: "100svh",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            gap: "16px",
            textAlign: "center",
            padding: "20px",
            color: "#eae5ec",
            fontFamily: "Geist, sans-serif",
          }}
        >
          <h1 style={{ margin: 0, fontSize: "28px", fontWeight: 500 }}>
            Something went wrong
          </h1>
          <p style={{ margin: 0, opacity: 0.65, maxWidth: "420px" }}>
            Please try reloading the page. If the issue persists, feel free to
            reach out.
          </p>
          <a
            href="/"
            style={{
              marginTop: "8px",
              color: "#c2a4ff",
              textDecoration: "none",
              borderBottom: "1px solid currentColor",
              paddingBottom: "2px",
            }}
          >
            Reload homepage →
          </a>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
