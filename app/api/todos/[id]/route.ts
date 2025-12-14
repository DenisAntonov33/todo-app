import prisma from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";
import { logError } from "@/lib/logger/logger";
import {
  TODO_DELETE_FAIL,
  TODO_DELETE_SUCCESS,
  TODO_NOT_FOUND,
  TODO_UPDATE_FAIL,
} from "@/lib/http/errorMessages";
import {
  todoDescriptionRule,
  todoOrderRule,
  todoStatusRule,
  todoTitleRule,
} from "@/lib/validation/todoValidationRules";
import { z } from "zod";
import { StatusCodes } from "http-status-codes";
import { isAuthError, returnUnauthorizedError } from "@/lib/auth/errorHandlers";
import { requireAuth } from "@/lib/auth/auth";

interface TodoIdRouteParams {
  id: string;
}

interface TodoIdRouteContext {
  params: Promise<TodoIdRouteParams>;
}

const updateTodoSchema = z.object({
  title: todoTitleRule().optional(),
  description: todoDescriptionRule(),
  status: todoStatusRule().optional(),
  order: todoOrderRule().optional(),
});

export const PUT = async (
  request: NextRequest,
  { params }: TodoIdRouteContext
) => {
  try {
    const user = await requireAuth();

    const { id } = await params;
    const body = await request.json();
    const validatedBody = updateTodoSchema.parse(body);

    const todo = await prisma.todo.findUnique({
      where: { id },
    });

    if (!todo || todo.userId !== user.id) {
      return NextResponse.json(
        { error: TODO_NOT_FOUND },
        { status: StatusCodes.NOT_FOUND }
      );
    }

    const newTodo = await prisma.todo.update({
      where: { id },
      data: validatedBody,
    });

    return NextResponse.json(newTodo, { status: StatusCodes.OK });
  } catch (error) {
    logError("error ==>", error);

    if (isAuthError(error)) {
      return returnUnauthorizedError();
    }

    return NextResponse.json(
      { error: TODO_UPDATE_FAIL },
      { status: StatusCodes.INTERNAL_SERVER_ERROR }
    );
  }
};

export const DELETE = async (
  _: NextRequest,
  { params }: TodoIdRouteContext
) => {
  try {
    const user = await requireAuth();

    const { id } = await params;

    const todo = await prisma.todo.findUnique({
      where: { id },
    });

    // Don't distinguish between "not found" and "forbidden" to prevent resource enumeration
    if (!todo || todo.userId !== user.id) {
      return NextResponse.json(
        { error: TODO_NOT_FOUND },
        { status: StatusCodes.NOT_FOUND }
      );
    }

    await prisma.todo.delete({
      where: { id },
    });

    return NextResponse.json(
      { message: TODO_DELETE_SUCCESS },
      { status: StatusCodes.OK }
    );
  } catch (error) {
    logError("error ==>", error);

    if (isAuthError(error)) {
      return returnUnauthorizedError();
    }

    return NextResponse.json(
      { error: TODO_DELETE_FAIL },
      { status: StatusCodes.INTERNAL_SERVER_ERROR }
    );
  }
};
