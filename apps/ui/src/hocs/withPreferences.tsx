import { ComponentType } from 'react';
import usePreferences from '@/hooks/usePreferences';
import { WithUserProps } from './withUser';

export interface WithPreferencesProps {
  preferences: Preferences;
}

function withPreferences<
  T extends WithUserProps & WithPreferencesProps = WithUserProps & WithPreferencesProps,
>(WrappedComponent: ComponentType<T>) {
  const displayName = WrappedComponent.displayName || WrappedComponent.name || 'Component';

  const ComponentWithPreferences = (props: Omit<T, keyof WithPreferencesProps>) => {
    const { data: preferences, status } = usePreferences(props.user);
    if (status === 'loading') return null;
    const preferencesProps = { preferences };
    return <WrappedComponent {...preferencesProps} {...(props as T)} />;
  };

  ComponentWithPreferences.displayName = `withPreferences(${displayName})`;

  return ComponentWithPreferences;
}

export default withPreferences;
