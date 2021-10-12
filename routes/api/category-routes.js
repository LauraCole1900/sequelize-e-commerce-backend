const router = require('express').Router();
const { Category, Product } = require('../../models');

// The `/api/categories` endpoint


// Find all categories
router.get('/', async (req, res) => {
  const categoriesData = await Category.findAll({
    // Include its associated Products
    include: [{ model: Product }]
  }).catch((err) => {
    res.json(err);
  });
  res.json(categoriesData);
});


// Find one category by its `id` value
router.get('/:id', async (req, res) => {
  try {
    const categoryData = await Category.findByPk(req.params.id, {
      // Include its associated Products
      include: [{ model: Product }]
    })
    if (!categoryData) {
      res.status(404).json({ message: `No category found with that ID` })
    }
    res.status(200).json(categoryData);
  } catch (err) {
    res.status(500).json(err)
  }
});


// Create a new category
router.post('/', async (req, res) => {
  try {
    const categoryData = await Category.create(req.body);
    res.status(200).json(categoryData);
  } catch (err) {
    res.status(500).json(err);
  }
});


// Update a category by its ID value
router.put('/:id', async (req, res) => {
  try {
    const categoryUpdate = await Category.update(req.body, { where: { id: req.params.id } });
    res.status(200).json(categoryUpdate);
  } catch (err) {
    res.status(500).json(err);
  }
});


// Delete a category by its ID value
router.delete('/:id', (req, res) => {
  try {
    Category.destroy({ where: { id: req.params.id } })
      .then(numCategories).json({ message: `${numCategories} categories deleted` })
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
