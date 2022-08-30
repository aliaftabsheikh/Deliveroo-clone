export default {
  name: "resturant",
  title: "Resturant",
  type: "document",
  fields: [
    {
      name: "name",
      type: "string",
      title: "Resturant Name",
      validation: (Rule) => Rule.required()
    },
    {
      name: "short_description",
      type: "string",
      title: "Short description",
      validation: (Rule) => Rule.max(200)
    },
    {
      name: "image",
      type: "image",
      title: "Image of the Resturant",
    },
    {
      name: "lat",
      type: "number",
      title: "Latitude of the Resturant",
      validation: (Rule) => Rule.required()
    },
    {
      name: "long",
      type: "number",
      title: "Longitude of the Resturant",
      validation: (Rule) => Rule.required()
    },
    {
      name: "address",
      type: "string",
      title: "Resturant Address",
    },
    {
      name: "rating",
      type: "number",
      title: "Enter a Rating from (1-5 Stars)",
      validation: (Rule)=> Rule.required().min(1).max(5).error("Please enter a Value between 1 and 5")
    },
    {
      name: "category",
      title: "Category",
      validation: (Rule)=> Rule.required(),
      type: "string",
      // to: [{type: "category"}]rr
    },
    {
      name: "dishes",
      type: "array",
      title: "Dishes",
      of: [{type: "reference", to: [{type: "dish"}]}]
    },
   
  ],
};
