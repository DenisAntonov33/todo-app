import prisma from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";
import { TODO_CREATE_FAIL, TODO_FETCH_FAIL } from "@/lib/http/errorMessages";
import { logError } from "@/lib/logger/logger";
import { TodoWhereInput } from "@/app/generated/prisma/models/Todo";
import { TodoStatusFilter } from "@/lib/todos/types";
import { z } from "zod";
import {
  todoDescriptionRule,
  todoTitleRule,
} from "@/lib/validation/todoValidationRules";
import { StatusCodes } from "http-status-codes";
import { requireAuth } from "@/lib/auth/auth";
import { isAuthError, returnUnauthorizedError } from "@/lib/auth/errorHandlers";

const createTodoSchema = z.object({
  title: todoTitleRule(),
  description: todoDescriptionRule(),
});

export const GET = async (request: NextRequest) => {
  try {
    const user = await requireAuth();
    const where: TodoWhereInput = {
      userId: user.id,
    };

    const searchParams = request.nextUrl.searchParams;
    const titleQuery = searchParams.get("title");
    const statusParam = searchParams.get("status");

    if (titleQuery) {
      where.title = { contains: titleQuery, mode: "insensitive" };
    }

    if (
      statusParam === TodoStatusFilter.COMPLETED ||
      statusParam === TodoStatusFilter.PENDING
    ) {
      where.status = statusParam;
    }

    const todos = await prisma.todo.findMany({
      where,
      orderBy: [{ order: "asc" }, { createdAt: "desc" }],
    });

    return NextResponse.json(todos);
  } catch (error) {
    logError("error ==>", error);

    if (isAuthError(error)) {
      return returnUnauthorizedError();
    }

    return NextResponse.json(
      { error: TODO_FETCH_FAIL },
      { status: StatusCodes.INTERNAL_SERVER_ERROR }
    );
  }
};

export const POST = async (request: NextRequest) => {
  try {
    const body = await request.json();
    const validatedBody = createTodoSchema.parse(body);

    const newTodo = await prisma.todo.create({
      data: validatedBody,
    });

    return NextResponse.json(newTodo, { status: StatusCodes.CREATED });
  } catch (error) {
    logError("error ==>", error);

    if (isAuthError(error)) {
      return returnUnauthorizedError();
    }

    return NextResponse.json(
      { error: TODO_CREATE_FAIL },
      { status: StatusCodes.INTERNAL_SERVER_ERROR }
    );
  }
};
