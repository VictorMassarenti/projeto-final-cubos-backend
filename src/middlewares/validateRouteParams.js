const validateRouteParams = (routeSchema) => async (req, res, next) => {
  try {
    await routeSchema.validateAsync(req.params);
    next();
  } catch (error) {
    if (error.message === "Id not found") {
      return res.status(404).json({ message: error.message });
    } else {
      return res.status(400).json({ message: error.message });
    }
  }
};

export default validateRouteParams;
