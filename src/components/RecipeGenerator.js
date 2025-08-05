import React, { useState } from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

function RecipeGenerator() {
  const [ingredients, setIngredients] = useState("");
  const [cuisine, setCuisine] = useState("");
  const [dietaryRestrictions, setDietaryRestrictions] = useState("");
  const [recipe, setRecipe] = useState("");
  const [loading, setLoading] = useState(false);
  const [err, setErr] = useState("");

  const generateRecipe = async () => {
    setLoading(true);
    setErr("");
    setRecipe("");

    try {
      const res = await fetch(
        `http://localhost:8080/recipe?ingredients=${encodeURIComponent(
          ingredients
        )}&cuisine=${encodeURIComponent(
          cuisine
        )}&dietaryRestrictions=${encodeURIComponent(dietaryRestrictions)}`,
        {
          method: "GET",
          headers: { Accept: "text/plain" }, // change to "application/json" if your API returns JSON
        }
      );

      if (!res.ok) throw new Error(`HTTP ${res.status}`);

      const text = await res.text(); // expecting Markdown text
      setRecipe(text);
    } catch (e) {
      console.error(e);
      setErr(e.message || "Failed to fetch");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ maxWidth: 800, margin: "0 auto", padding: 16 }}>
      <h2>Create a Recipe</h2>

      {/* Form rows */}
      <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
        <label htmlFor="ingredient" style={{ minWidth: 180 }}>Ingredients :</label>
        <input
          id="ingredient"
          type="text"
          value={ingredients}
          onChange={(e) => setIngredients(e.target.value)}
          placeholder="e.g., potatoes, tomatoes, onion"
          style={{ flex: 1 }}
        />
      </div>

      <div style={{ display: "flex", alignItems: "center", gap: 8, marginTop: 10 }}>
        <label htmlFor="cuisine" style={{ minWidth: 180 }}>Cuisine :</label>
        <input
          id="cuisine"
          type="text"
          value={cuisine}
          onChange={(e) => setCuisine(e.target.value)}
          placeholder="e.g., Indian, Italian"
          style={{ flex: 1 }}
        />
      </div>

      <div style={{ display: "flex", alignItems: "center", gap: 8, marginTop: 10 }}>
        <label htmlFor="dietaryRestrictions" style={{ minWidth: 180 }}>
          Dietary Restrictions :
        </label>
        <input
          id="dietaryRestrictions"
          type="text"
          value={dietaryRestrictions}
          onChange={(e) => setDietaryRestrictions(e.target.value)}
          placeholder="e.g., vegan, gluten-free"
          style={{ flex: 1 }}
        />
      </div>

      <button
        onClick={generateRecipe}
        disabled={loading}
        style={{ marginTop: 12 }}
      >
        {loading ? "Generating..." : "Create Recipe"}
      </button>

      {err && <p style={{ color: "red" }}>Error: {err}</p>}

      {/* Markdown output */}
      {recipe && (
        <div style={{ marginTop: 16, textAlign: "left" }}>
          <ReactMarkdown remarkPlugins={[remarkGfm]}>
            {recipe}
          </ReactMarkdown>
        </div>
      )}
    </div>
  );
}

export default RecipeGenerator;
