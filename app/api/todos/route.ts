import prisma from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";
import { StatusCode } from "@/lib/http/StatusCode";
import { TODO_CREATE_FAIL, TODO_FETCH_FAIL } from "@/lib/http/errorMessages";
import { logError } from "@/lib/logger/logger";

export const GET = async () => {
  try {
    const todos = await prisma.todo.findMany();

    return NextResponse.json(todos);
  } catch (error) {
    logError("error ==>", error);

    return NextResponse.json(
      { error: TODO_FETCH_FAIL },
      { status: StatusCode.INTERNAL_SERVER_ERROR }
    );
  }
};

export const POST = async (request: NextRequest) => {
  try {
    const body = await request.json();
    const newTodo = await prisma.todo.create({
      data: body,
    });

    return NextResponse.json(newTodo, { status: StatusCode.CREATED });
  } catch (error) {
    logError("error ==>", error);

    return NextResponse.json(
      { error: TODO_CREATE_FAIL },
      { status: StatusCode.INTERNAL_SERVER_ERROR }
    );
  }
};
