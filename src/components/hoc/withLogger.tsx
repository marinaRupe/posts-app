import React, { useEffect } from 'react';

const getDisplayName = <TProps extends object>(WrappedComponent: React.ComponentType<TProps>): string => (
  WrappedComponent.displayName ?? WrappedComponent.name ?? 'Component'
);

const loggingEnabled: boolean = process.env.REACT_APP_LOGGING_DISABLED !== 'true';

export interface LoggerProps {
  loggerMessage?: string;
}

export const withLogger = <TProps extends LoggerProps>(
  WrappedComponent: React.ComponentType<TProps>
): typeof WrappedComponent => (
    (props) => {
      useEffect(() => {
        const message = props.loggerMessage ?? 'Hello from';
        const componentName = getDisplayName(WrappedComponent);

        if (loggingEnabled) {
          console.log(`${message} ${componentName}`);
        }
      });

      return (
        <WrappedComponent {...props} />
      );
    }
  );

export default withLogger;
