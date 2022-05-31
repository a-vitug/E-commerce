const router = require('express').Router();
const { Tag, Product, ProductTag } = require('../../models');

// The `/api/tags` endpoint

router.get('/', (req, res) => {
  Tag.findAll({
    include: [
      {
        model: Product,
        attributes: ['id', 'product_name', 'price', 'stock', 'category_id'],
      }
    ]
  })
    .then(dbTags => res.json(dbTags))
    .catch(err => {
      console.log(err);
      res.status(500).json(err);
    });
});

router.get('/:id', (req, res) => {
  Tag.findOne({
    where: {
      id: req.params.id
    },
    include: [
      {
        model: Product,
        attributes: ['id', 'product_name', 'price', 'stock', 'category_id'],
      }
    ]
  })
    .then(dbTags => {
      if (!dbTags) {
        res.status(404).json({ message: 'No tag found with this id'});
        return;
      }
      res.json(dbTags);
    })
    .catch(err => {
      console.log(err);
      res.status(500).json(err);
    });
});

router.post('/', (req, res) => {
  Tag.create({
    tag_name: req.body.tag_name
  })
    .then(dbTags => res.json(dbTags))
    .catch(err => {
        console.log(err);
        res.status(500).json(err);
  });
});

router.put('/:id', (req, res) => {
  Tag.update(req.body, {
    where: {
        id: req.params.id
    }
  })
    .then(dbTags => {
        if (!dbTags[0]) {
            res.status(404).json({ message: 'No tag found with this id'});
            return;
        }
        res.json(dbTags);
  })
    .catch(err => {
        console.log(err); 
        res.status(500).json(err);
  });

});

router.delete('/:id', (req, res) => {
  Tag.destroy({
    where: {
        id: req.params.id
    }
  })
    .then(dbTags => {
        if (!dbTags) {
            res.status(404).json({ message: 'No tag found with this id'});
            return;
        }
        res.json(dbTags);
  })
    .catch(err => {
        console.log(err);
        res.status(500).json(err);
  });
});

module.exports = router;
