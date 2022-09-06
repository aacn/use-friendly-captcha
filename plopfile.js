const requireField = (fieldName) => {
  return (value) => {
    if (String(value).length === 0) {
      return fieldName + ' is required';
    }
    return true;
  };
};

module.exports = (plop) => {
  plop.setGenerator('component', {
    description: 'Create a reusable component',
    prompts: [
      {
        type: 'input',
        name: 'name',
        message: 'What is your component name?',
        validate: requireField('name'),
      },
    ],
    actions: [
      {
        type: 'add',
        path: 'src/components/{{pascalCase name}}/{{pascalCase name}}.tsx',
        templateFile: 'plop-templates/Component/Component.tsx.hbs',
      },
      {
        type: 'add',
        path: 'src/components/{{pascalCase name}}/{{pascalCase name}}.test.tsx',
        templateFile: 'plop-templates/Component/Component.test.tsx.hbs',
      },
      {
        type: 'add',
        path: 'src/components/{{pascalCase name}}/I{{pascalCase name}}.ts',
        templateFile: 'plop-templates/Component/ComponentInterface.ts.hbs',
      },
      {
        type: 'add',
        path: 'src/components/{{pascalCase name}}/index.tsx',
        templateFile: 'plop-templates/injectable-index.tsx.hbs',
        skipIfExists: true,
      },
      {
        type: 'append',
        path: 'src/components/{{pascalCase name}}/index.tsx',
        pattern: `/* PLOP_INJECT_IMPORT */`,
        template: `import { {{pascalCase name}} } from './{{pascalCase name}}';`,
      },
      {
        type: 'append',
        path: 'src/components/{{pascalCase name}}/index.tsx',
        pattern: `/* PLOP_INJECT_EXPORT */`,
        template: `\t{{pascalCase name}},`,
      },
    ],
  });
  plop.setGenerator('context', {
    description: 'Create context Component',
    prompts: [
      {
        type: 'input',
        name: 'name',
        message: 'What is your context name?',
        validate: requireField('name'),
      },
    ],
    actions: [
      {
        type: 'add',
        path: 'src/components/{{pascalCase name}}Context/{{pascalCase name}}Provider.tsx',
        templateFile: 'plop-templates/Context/Provider.tsx.hbs',
      },
      {
        type: 'add',
        path: 'src/components/{{pascalCase name}}Context/use{{pascalCase name}}Context.tsx',
        templateFile: 'plop-templates/Context/Context.tsx.hbs',
      },
      {
        type: 'add',
        path: 'src/components/{{pascalCase name}}Context/index.tsx',
        templateFile: 'plop-templates/injectable-index.tsx.hbs',
        skipIfExists: true,
      },
      {
        type: 'append',
        path: 'src/components/{{pascalCase name}}Context/index.tsx',
        pattern: `/* PLOP_INJECT_IMPORT */`,
        template: `import { {{pascalCase name}}Provider } from './{{pascalCase name}}Provider';`,
      },
      {
        type: 'append',
        path: 'src/components/{{pascalCase name}}Context/index.tsx',
        pattern: `/* PLOP_INJECT_EXPORT */`,
        template: `\t{{pascalCase name}}Provider,`,
      },
      {
        type: 'append',
        path: 'src/components/{{pascalCase name}}Context/index.tsx',
        pattern: `/* PLOP_INJECT_IMPORT */`,
        template: `import { use{{pascalCase name}}Context } from './use{{pascalCase name}}Context';`,
      },
      {
        type: 'append',
        path: 'src/components/{{pascalCase name}}Context/index.tsx',
        pattern: `/* PLOP_INJECT_EXPORT */`,
        template: `\tuse{{pascalCase name}}Context,`,
      },
    ],
  });
  plop.setGenerator('page', {
    description: 'Create a page',
    prompts: [
      {
        type: 'input',
        name: 'name',
        message: 'What is your page name?',
        validate: requireField('name'),
      },
    ],
    actions: [
      {
        type: 'add',
        path: 'src/pages/{{pascalCase name}}/{{pascalCase name}}.tsx',
        templateFile: 'plop-templates/Page/Page.tsx.hbs',
      },
      {
        type: 'add',
        path: 'src/pages/{{pascalCase name}}/{{pascalCase name}}.test.tsx',
        templateFile: 'plop-templates/Page/Page.test.tsx.hbs',
      },
      {
        type: 'add',
        path: 'src/pages/{{pascalCase name}}/index.tsx',
        templateFile: 'plop-templates/Page/index.tsx.hbs',
      },
    ],
  });

  plop.setGenerator('hook', {
    description: 'Create a custom react hook',
    prompts: [
      {
        type: 'input',
        name: 'name',
        message: 'What is your hook name?',
        validate: requireField('name'),
      },
    ],
    actions: [
      {
        type: 'add',
        path: 'src/hooks/{{camelCase name}}.tsx',
        templateFile: 'plop-templates/hook.tsx.hbs',
      },
      {
        type: 'append',
        path: 'src/hooks/index.tsx',
        pattern: `/* PLOP_INJECT_IMPORT */`,
        template: `import {{camelCase name}} from './{{camelCase name}}';`,
      },
    ],
  });
};
