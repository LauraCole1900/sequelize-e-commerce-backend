const router = require('express').Router();
const { Category, Product } = require('../../models');

// The `/api/categories` endpoint


// GET all categories
router.get('/', async (req, res) => {
  const categoriesData = await Category.findAll({
    // Include its associated Products
    include: [{ model: Product }]
  }).catch((err) => {
    res.json(err);
  });
  res.json(categoriesData);
});


// GET one category by ID
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


// POST a new category
router.post('/', async (req, res) => {
  try {
    const categoryData = await Category.create(req.body);
    res.status(200).json(categoryData);
  } catch (err) {
    res.status(500).json(err);
  }
});


// UPDATE category by ID
router.put('/:id', async (req, res) => {
  try {
    const categoryUpdate = await Category.update(req.body, { where: { id: req.params.id } });
    res.status(200).json(categoryUpdate);
  } catch (err) {
    res.status(500).json(err);
  }
});


// DELETE category by ID
router.delete('/:id', (req, res) => {
  try {
    Category.destroy({ where: { id: req.params.id } })
      .then(numCategories).json({ message: `${numCategories} categories deleted` })
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
