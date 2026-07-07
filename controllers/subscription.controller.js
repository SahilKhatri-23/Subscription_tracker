import Subscription from "../models/subscription.model.js";

const requireOwnership = (subscription, userId) => {
  if (!subscription) {
    const error = new Error("Subscription not found");
    error.statusCode = 404;
    throw error;
  }

  if (subscription.user.toString() !== userId.toString()) {
    const error = new Error("Unauthorized");
    error.statusCode = 403;
    throw error;
  }

  return subscription;
};

export const getAllSubscriptions = async (req, res, next) => {
  try {
    const subscriptions = await Subscription.find().sort({ createdAt: -1 });

    res.status(200).json({ success: true, data: subscriptions });
  } catch (error) {
    next(error);
  }
};

export const getSubscriptionById = async (req, res, next) => {
  try {
    const subscription = await Subscription.findById(req.params.id);
    requireOwnership(subscription, req.user._id);

    res.status(200).json({ success: true, data: subscription });
  } catch (error) {
    next(error);
  }
};

export const createSubscription = async (req, res, next) => {
  try {
    const subscription = await Subscription.create({
      ...req.body,
      user: req.user._id,
    });

    res.status(201).json({ success: true, data: subscription });
  } catch (error) {
    next(error);
  }
};

export const updateSubscription = async (req, res, next) => {
  try {
    const subscription = await Subscription.findById(req.params.id);
    requireOwnership(subscription, req.user._id);

    const updates = [
      "name",
      "price",
      "currency",
      "frequency",
      "category",
      "paymentMethod",
      "status",
      "startDate",
      "renewalDate",
    ];

    updates.forEach((field) => {
      if (field in req.body) {
        subscription[field] = req.body[field];
      }
    });

    const updated = await subscription.save();

    res.status(200).json({ success: true, data: updated });
  } catch (error) {
    next(error);
  }
};

export const deleteSubscription = async (req, res, next) => {
  try {
    const subscription = await Subscription.findById(req.params.id);
    requireOwnership(subscription, req.user._id);

    await subscription.deleteOne();

    res.status(200).json({
      success: true,
      message: "Subscription deleted successfully",
    });
  } catch (error) {
    next(error);
  }
};

export const cancelSubscription = async (req, res, next) => {
  try {
    const subscription = await Subscription.findById(req.params.id);
    requireOwnership(subscription, req.user._id);

    subscription.status = "canceled";
    const canceled = await subscription.save();

    res.status(200).json({ success: true, data: canceled });
  } catch (error) {
    next(error);
  }
};

export const getUserSubscriptions = async (req, res, next) => {
  try {
    if (req.user._id.toString() !== req.params.id.toString()) {
      const error = new Error("You are not the owner of this account");
      error.statusCode = 403;
      throw error;
    }

    const subscriptions = await Subscription.find({ user: req.params.id }).sort(
      { renewalDate: 1 },
    );

    res.status(200).json({ success: true, data: subscriptions });
  } catch (error) {
    next(error);
  }
};

export const getUpcomingRenewals = async (req, res, next) => {
  try {
    const now = new Date();

    const subscriptions = await Subscription.find({
      user: req.user._id,
      renewalDate: { $gte: now },
      status: { $in: ["active", "inactive"] },
    }).sort({ renewalDate: 1 });

    res.status(200).json({ success: true, data: subscriptions });
  } catch (error) {
    next(error);
  }
};
