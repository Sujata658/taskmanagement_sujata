import { Component, ErrorInfo, ReactNode } from 'react';
import FallbackUI from '../FallBackUI';

interface ErrorBoundaryProps {
    children: ReactNode;
}

interface ErrorBoundaryState {
    hasError: boolean;
}

class ErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
    constructor(props: ErrorBoundaryProps) {
        super(props);
        this.state = { hasError: false };
    }

    static getDerivedStateFromError(_: Error): ErrorBoundaryState {
        return { hasError: true };
    }

    componentDidCatch(error: Error, errorInfo: ErrorInfo): void {
        console.error('ErrorBoundary caught an error:', error, errorInfo);
        this.setState({ hasError: true });
    }
    
    render() {
        if (this.state.hasError) {
            return <FallbackUI />;
        }
    
        return this.props.children;
    }
    
}

export default ErrorBoundary;