import { ChildApp } from '@tramvai/module-child-app';

export const IndexPage = () => {
  return (
    <main>
      <ChildApp name="passenger-form" />
    </main>
  );
};

IndexPage.childApps = [{ name: 'passenger-form' }];

export default IndexPage;
