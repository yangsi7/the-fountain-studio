### Generating TypeScript Types with Supabase

You can generate TypeScript types for your Supabase API directly from your database schema using either the Supabase project dashboard or the **Supabase CLI**. Supabase automatically introspects your database to create type-safe API definitions.

-----

### Using the Supabase CLI 💻

This method is ideal for integrating type generation into your development workflow.

1.  **Install the CLI**: First, install the Supabase CLI (version 1.8.1 or higher) as a development dependency in your project.

    ```bash
    npm i supabase@">=1.8.1" --save-dev
    ```

2.  **Authenticate**: Log in with your Personal Access Token.

    ```bash
    npx supabase login
    ```

3.  **Initialize Project**: Ensure you've initialized your Supabase project.

    ```bash
    npx supabase init
    ```

4.  **Generate Types**: Generate and save the types to a file named `database.types.ts`.

      * For a remote project:
        ```bash
        npx supabase gen types typescript --project-id "$PROJECT_REF" --schema public > database.types.ts
        ```
      * For a local development environment:
        ```bash
        npx supabase gen types typescript --local > database.types.ts
        ```

This process creates a `Database` interface that includes type definitions for your tables, rows, inserts, and updates, ensuring your code is type-safe.

-----

### Utilizing Generated Types 🚀

Once generated, you can use these types to provide type safety to your `supabase-js` client and enhance your queries.

1.  **Type the Supabase Client**: Import the `Database` type and pass it to your client instance. This ensures all subsequent queries are type-checked.

    ```typescript
    import { createClient } from '@supabase/supabase-js'
    import { Database } from './database.types'

    const supabase = createClient<Database>(
      process.env.SUPABASE_URL,
      process.env.SUPABASE_PUBLISHABLE_KEY
    )
    ```

2.  **Use Helper Types**: Supabase provides helper types like `Tables` and `Enums` for more concise type definitions.

    ```typescript
    import { Tables } from "./database.types.ts";

    let movie: Tables<'movies'>;
    ```

3.  **Enhance JSON Field Inference**: For versions of `supabase-js` v2.48.0 and above, you can define custom types for **JSON** columns. Use the `MergeDeep` utility from `type-fest` to extend the generated types with your custom schemas. This provides type-safe inference when using JSON selectors (`->` and `->>` operators).

    ```typescript
    import { MergeDeep } from 'type-fest';
    import { Database as DatabaseGenerated } from './database-generated.types';

    type CustomJsonType = {
      foo: string;
      bar: { baz: number };
    };

    export type Database = MergeDeep<
      DatabaseGenerated,
      {
        public: {
          Tables: {
            your_table: {
              Row: {
                data: CustomJsonType | null;
              };
            };
          };
        };
      }
    >;
    ```

-----

### Automating Type Updates with GitHub Actions 🤖

To keep your types in sync with your database, you can set up a GitHub Action to automatically generate and commit type changes.

1.  **Add a script to `package.json`**:

    ```json
    "scripts": {
      "update-types": "npx supabase gen types --lang=typescript --project-id \"$PROJECT_REF\" > database.types.ts"
    }
    ```

2.  **Create a GitHub Workflow**: Define a workflow file (`.github/workflows/update-types.yml`) that runs the script on a schedule.

    ```yaml
    name: Update database types
    on:
      schedule:
        - cron: '0 0 * * *'
    jobs:
      update:
        runs-on: ubuntu-latest
        permissions:
          contents: write
        env:
          SUPABASE_ACCESS_TOKEN: ${{ secrets.ACCESS_TOKEN }}
          PROJECT_REF: your-project-id
        steps:
          - uses: actions/checkout@v4
            with:
              persist-credentials: false
              fetch-depth: 0
          - uses: actions/setup-node@v4
            with:
              node-version: 22
          - run: npm run update-types
          - name: check for file changes
            id: git_status
            run: |
              echo "status=$(git status -s)" >> $GITHUB_OUTPUT
          - name: Commit files
            if: ${{contains(steps.git_status.outputs.status, ' ')}}
            run: |
              git add database.types.ts
              git config --local user.email "41898282+github-actions[bot]@users.noreply.github.com"
              git config --local user.name "github-actions[bot]"
              git commit -m "Update database types" -a
          - name: Push changes
            if: ${{contains(steps.git_status.outputs.status, ' ')}}
            uses: ad-m/github-push-action@master
            with:
              github_token: ${{ secrets.GITHUB_TOKEN }}
              branch: ${{ github.ref }}
    ```

This action will check for and commit any changes to your `database.types.ts` file nightly, keeping your project's types consistently up-to-date.
