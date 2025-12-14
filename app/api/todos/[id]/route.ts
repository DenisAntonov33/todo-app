import prisma from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";
import { logError } from "@/lib/logger/logger";
import {
  TODO_DELETE_FAIL,
  TODO_DELETE_SUCCESS,
  TODO_UPDATE_FAIL,
} from "@/lib/http/errorMessages";
import { StatusCode } from "@/lib/http/StatusCode";

interface TodoIdRouteParams {
  id: string;
}

interface TodoIdRouteContext {
  params: Promise<TodoIdRouteParams>;
}

export const PUT = async (
  request: NextRequest,
  { params }: TodoIdRouteContext
) => {
  try {
    const { id } = await params;
    const body = await request.json();
    const newTodo = await prisma.todo.update({
      where: { id },
      data: body,
    });

    return NextResponse.json(newTodo, { status: StatusCode.OK });
  } catch (error) {
    logError("error ==>", error);

    return NextResponse.json(
      { error: TODO_UPDATE_FAIL },
      { status: StatusCode.INTERNAL_SERVER_ERROR }
    );
  }
};

export const DELETE = async (
  _: NextRequest,
  { params }: TodoIdRouteContext
) => {
  try {
    const { id } = await params;
    prisma.todo.delete({
      where: { id },
    });

    return NextResponse.json(
      { message: TODO_DELETE_SUCCESS },
      { status: StatusCode.OK }
    );
  } catch (error) {
    logError("error ==>", error);

    return NextResponse.json(
      { error: TODO_DELETE_FAIL },
      { status: StatusCode.INTERNAL_SERVER_ERROR }
    );
  }
};
