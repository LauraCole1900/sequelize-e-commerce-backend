const router = require('express').Router();
const { Tag, Product, ProductTag } = require('../../models');

// The `/api/tags` endpoint


// GET all tags
router.get('/', async (req, res) => {
  const tagsData = await Tag.findAll({
    // Include its associated Products
    include: [{ model: Product, through: ProductTag }]
  }).catch((err) => {
    res.json(err);
  });
  res.json(tagsData);
});


// GET one tag by ID
router.get('/:id', async (req, res) => {
  try {
    const tagData = await Tag.findByPk(req.params.id, {
      // Include its associated Product data
      include: [{ model: Product, through: ProductTag }]
    })
    if (!tagData) {
      res.status(404).json({ message: `No tag found with that ID` })
    }
    res.status(200).json(tagData);
  } catch (err) {
    res.status(500).json(err)
  }
});


// POST a new tag
router.post('/', async (req, res) => {
  try {
    const tagData = await Tag.create(req.body);
    res.status(200).json(tagData);
  } catch (err) {
    res.status(500).json(err);
  }
});


// UPDATE a tag by ID
router.put('/:id', async (req, res) => {
  try {
    const tagUpdate = await Tag.update(req.body, { where: { id: req.params.id } });
    res.status(200).json({ message: `${tagUpdate} tags updated` });
  } catch (err) {
    res.status(500).json(err);
  }
});


// DELETE tag by ID
router.delete('/:id', (req, res) => {
  Tag.destroy({ where: { id: req.params.id } })
    .then(tags => res.json({ message: `${tags} tags deleted` }))
    .catch(err => {
      res.status(400).json(err);
    })
});


module.exports = router;
