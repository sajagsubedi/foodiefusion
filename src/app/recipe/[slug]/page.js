import { RecipePage, Instructions } from "@/styles/ComponentStyles";

 async function Page({ params }) {
  let url = `https://api.spoonacular.com/recipes/${params.slug}/information?apiKey=5f70ca9273b646fc9273d94863b5b97f`;
  let resp = await fetch(url);
  resp = await resp.json();
 return (
    <RecipePage>
          <h2 className="recipeTitle">{resp.title}</h2>
          <img className="recipeImage" src={resp.image} />
          <Instructions>
            <h3>Instructions:</h3>
            <div
              className="instructionsBody"
              dangerouslySetInnerHTML={{ __html: resp.instructions }}
            />
          </Instructions>
          <div className="summary">
            <h3>Summary</h3>
            <p dangerouslySetInnerHTML={{ __html: resp.summary }} />
          </div>
    </RecipePage>
  );
}


const RecipeDetails = async({params}) => {
  
  let url = `https://api.spoonacular.com/recipes/${params.slug}/information?apiKey=5f70ca9273b646fc9273d94863b5b97f`;
  let resp = await fetch(url);
  resp = await resp.json();
  const {
    title,
    image,
    summary,
    extendedIngredients,
    analyzedInstructions,
  } = resp;

  return (
   <RecipePage>
      <img className="recipeImage" src={image} alt={title} />
      <h1 className="recipeTitle">{title}</h1>
      <p className="recipe-summary" dangerouslySetInnerHTML={{ __html: summary }} />

      <h2>Ingredients:</h2>
      <ul className="ingredients-list">
        {extendedIngredients.map((ingredient) => (
          <li key={ingredient.id}>{`${ingredient.amount} ${ingredient.unit} ${ingredient.name}`}</li>
        ))}
      </ul>

      <h2>Instructions:</h2>
      <ol className="instructions-list">
        {analyzedInstructions[0]?.steps.map((step) => (
          <li key={step.number}>{step.step}</li>
        ))}
      </ol>
    </RecipePage>
  );
};

export default RecipeDetails;
