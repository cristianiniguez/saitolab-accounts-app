import { User } from 'firebase/auth';
import { ComponentType } from 'react';
import { useUser } from 'reactfire';

export interface WithUserProps {
  user: User;
}

function withUser<T extends WithUserProps = WithUserProps>(WrappedComponent: ComponentType<T>) {
  const displayName = WrappedComponent.displayName || WrappedComponent.name || 'Component';

  const ComponentWithUser = (props: Omit<T, keyof WithUserProps>) => {
    const { data: user, status } = useUser();
    if (status === 'loading' || !user) return null;
    const userProps = { user };
    return <WrappedComponent {...userProps} {...(props as T)} />;
  };

  ComponentWithUser.displayName = `withUser(${displayName})`;

  return ComponentWithUser;
}

export default withUser;
