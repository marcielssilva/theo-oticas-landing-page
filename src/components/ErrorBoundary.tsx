import { Component, type ErrorInfo, type ReactNode } from "react";

interface Props {
  children: ReactNode;
}

interface State {
  hasError: boolean;
}

/**
 * Qualquer erro de render derrubava a página inteira em branco — sem mensagem
 * e sem caminho de volta. Aqui o visitante ao menos consegue recarregar ou
 * falar com a loja.
 */
export default class ErrorBoundary extends Component<Props, State> {
  state: State = { hasError: false };

  static getDerivedStateFromError(): State {
    return { hasError: true };
  }

  componentDidCatch(error: Error, info: ErrorInfo) {
    console.error("Erro não tratado na aplicação:", error, info.componentStack);
  }

  render() {
    if (!this.state.hasError) return this.props.children;

    return (
      <div className="flex min-h-screen items-center justify-center bg-background px-6">
        <div className="max-w-md text-center">
          <h1 className="font-display text-display-md font-bold text-foreground">
            Algo deu errado por aqui
          </h1>
          <p className="mt-4 text-muted-foreground">
            A página não carregou como deveria. Recarregar costuma resolver.
          </p>
          <button
            type="button"
            onClick={() => window.location.reload()}
            className="btn-primary btn-lg mt-8"
          >
            Recarregar a página
          </button>
        </div>
      </div>
    );
  }
}
