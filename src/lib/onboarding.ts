/**
 * Onboarding handler for new customers
 * Initiates the onboarding process after successful checkout
 */

import { db } from "./db";
import { sendOnboardingWelcome, notifyAdminOfNewOrder } from "./notifications";

// Type imports from Prisma
import type { PlanType, OrderStatus, TaskType, TaskStatus } from "@prisma/client";

interface CustomerData {
  name: string;
  email: string;
  phone?: string;
  daycare: string;
  address?: string;
  city?: string;
  state?: string;
  zip?: string;
}

interface OnboardingResult {
  success: boolean;
  customerId?: string;
  orderId?: string;
  error?: string;
}

/**
 * Initialize onboarding for a new customer
 * Creates customer record and sends notifications
 */
export async function initializeOnboarding(
  customer: CustomerData,
  plan: PlanType,
  orderId?: string
): Promise<OnboardingResult> {
  try {
    // Create or update customer in database
    const existingCustomer = await db.user.findFirst({
      where: { email: customer.email }
    });

    let dbCustomer;
    if (existingCustomer) {
      // Update existing customer
      dbCustomer = await db.user.update({
        where: { id: existingCustomer.id },
        data: {
          name: customer.name,
          phone: customer.phone,
          daycareName: customer.daycare,
          address: customer.address,
          city: customer.city,
          state: customer.state,
          zip: customer.zip,
          updatedAt: new Date(),
        },
      });
    } else {
      // Create new customer
      dbCustomer = await db.user.create({
        data: {
          email: customer.email,
          name: customer.name,
          phone: customer.phone,
          daycareName: customer.daycare,
          address: customer.address,
          city: customer.city,
          state: customer.state,
          zip: customer.zip,
        },
      });
    }

    // Determine order status based on plan
    const orderStatus: OrderStatus = plan === "FREE_SAMPLE" ? "PENDING_SAMPLE" : "ACTIVE";
    const amount = plan === "FREE_SAMPLE" ? 0 : 50;

    // Create order record
    const order = await db.order.create({
      data: {
        id: orderId,
        userId: dbCustomer.id,
        plan: plan,
        status: orderStatus,
        amount: amount,
      },
    });

    // Determine task type based on plan
    const taskType: TaskType = plan === "FREE_SAMPLE" ? "SAMPLE_CREATION" : "WEBSITE_SETUP";

    // Create onboarding task
    await db.onboardingTask.create({
      data: {
        userId: dbCustomer.id,
        orderId: order.id,
        status: "PENDING" as TaskStatus,
        type: taskType,
        priority: 1,
      },
    });

    // Send welcome email to customer
    await sendOnboardingWelcome({
      id: dbCustomer.id,
      name: customer.name,
      email: customer.email,
      daycare: customer.daycare,
    });

    // Notify admin of new order
    await notifyAdminOfNewOrder(
      {
        id: order.id,
        plan: plan,
        status: orderStatus,
        amount: amount,
        createdAt: order.createdAt,
      },
      {
        id: dbCustomer.id,
        name: customer.name,
        email: customer.email,
        phone: customer.phone,
        daycare: customer.daycare,
        address: customer.address,
        city: customer.city,
        state: customer.state,
        zip: customer.zip,
      }
    );

    return {
      success: true,
      customerId: dbCustomer.id,
      orderId: order.id,
    };
  } catch (error) {
    console.error("Onboarding error:", error);
    return {
      success: false,
      error: error instanceof Error ? error.message : "Unknown error",
    };
  }
}

/**
 * Get onboarding status for a customer
 */
export async function getOnboardingStatus(customerId: string) {
  const tasks = await db.onboardingTask.findMany({
    where: { userId: customerId },
    orderBy: { createdAt: "desc" },
    include: { order: true },
  });

  return tasks.map((task) => ({
    id: task.id,
    type: task.type,
    status: task.status,
    priority: task.priority,
    notes: task.notes,
    createdAt: task.createdAt,
    completedAt: task.completedAt,
    order: {
      id: task.order.id,
      plan: task.order.plan,
      status: task.order.status,
    },
  }));
}

/**
 * Complete an onboarding task
 */
export async function completeOnboardingTask(taskId: string, notes?: string) {
  const task = await db.onboardingTask.update({
    where: { id: taskId },
    data: {
      status: "COMPLETED" as TaskStatus,
      completedAt: new Date(),
      notes: notes,
    },
  });

  return task;
}

/**
 * Get all pending onboarding tasks (for admin)
 */
export async function getPendingOnboardingTasks() {
  const tasks = await db.onboardingTask.findMany({
    where: { status: "PENDING" as TaskStatus },
    orderBy: [
      { priority: "desc" },
      { createdAt: "asc" },
    ],
    include: {
      user: true,
      order: true,
    },
  });

  return tasks;
}

/**
 * Update task status
 */
export async function updateTaskStatus(
  taskId: string,
  status: TaskStatus,
  notes?: string
) {
  const updateData: { status: TaskStatus; notes?: string; completedAt?: Date } = {
    status,
  };

  if (notes) {
    updateData.notes = notes;
  }

  if (status === "COMPLETED") {
    updateData.completedAt = new Date();
  }

  const task = await db.onboardingTask.update({
    where: { id: taskId },
    data: updateData,
  });

  return task;
}
