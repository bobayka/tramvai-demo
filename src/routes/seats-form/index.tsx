import { ChildApp } from '@tramvai/module-child-app';

export const IndexPage = () => {
  return (
    <main>
      <ChildApp name="seats-form" />
    </main>
  );
};

export default IndexPage;
