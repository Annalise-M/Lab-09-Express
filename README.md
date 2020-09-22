Goal:

    Build a recipe storage application. 
    It should let you 
        create new recipes, -check
       ** get a recipe by id, 
        get all recipes, -check
        update a recipe by id, and -check
       ** delete a recipe by id.

Need Routes for
    Id, 
    getAll,
    update by Id, 
    and delete by Id

---

*** INSTRUCTIONS ***

    LAB: Express
        Build a recipe storage application. It should let you create new recipes, get a recipe by id, get all recipes, update a recipe by id, and delete a recipe by id.

    Getting Started
        In the starter-code, there the basic scaffolding for a recipe storage application. Take a look at the included files.

    Requirements
        Missing Tests (3 points)
        There are some missing tests. Determine any gaps in test coverage and fill in the gaps (focus on missing route tests).

    Refactor to use Router (3 points)
        To help promote cleaner code, refactor your routes into a lib/controllers/recipes.js file. Use and export an express.Router.

    Add a second model (3 point)
        Add a Log model which tracks when you used a recipe. 
        A Log has: recipeId, dateOfEvent, notes, and rating. Create all CRUD routes for your Log model

*** Add ingredients (1 points) ***

    Our model is incomplete. In order to provide a better user experience our recipes should include the ingredients needed for a recipes. Add an ingredients field, which is an array with amount, measurement (‘teaspoon’,’tablespoon’, ‘cup’, ‘ounce’, ‘grams’), and name (use a JSONB column).
