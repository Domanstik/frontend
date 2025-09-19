import { Component } from 'react';

export default class ErrorBoundary extends Component {
  state = { hasError: false };
  static getDerivedStateFromError() { return { hasError: true }; }
  componentDidCatch(err, info) { console.error('ErrorBoundary', err, info); }
  render() {
    if (this.state.hasError) {
      return (
        <div style={{ padding: 16 }}>
          <h2>Что-то пошло не так</h2>
          <p>Попробуйте обновить страницу или перейти на другой экран.</p>
        </div>
      );
    }
    return this.props.children;
  }
}
