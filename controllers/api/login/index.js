exports.getLogins = async (req, res) => {
  console.log('getLogins');
  try {
    res.status(200).json({
      data: [
        'google'
      ]
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
