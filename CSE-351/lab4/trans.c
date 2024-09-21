/*
 * CSE 351 Lab 4 (Caches and Cache-Friendly Code)
 * Part 2 - Optimizing Matrix Transpose
 *
 * Name(s): Anthony Wen, Tim Avilov
 * NetID(s): wena04, timchick
 *
 * Each transpose function must have a prototype of the form:
 * void trans(int M, int N, int A[M][N], int B[N][M]);
 * and compute B = A^T.
 *
 * A transpose function is evaluated by counting the number of misses
 * on a 1 KiB direct mapped cache with a block size of 32 bytes.
 */

#include <stdio.h>
#include "support/cachelab.h"

int is_transpose(int M, int N, int A[M][N], int B[N][M]);

/*
 * transpose_submit - This is the transpose function that you will be graded
 *     on. Do not change the description string "Transpose submission", as the
 *     driver searches for that string to identify the transpose function to be
 *     graded.
 */
char transpose_submit_desc[] = "Transpose submission";
void transpose_submit(int M, int N, int A[M][N], int B[N][M])
{
    // s = 5 (index bits), E = 1 (associativity), k = 5 (offset bits)
    // 32 x 32: 5 points if m ≤ 288, 0 points if m > 600
    // 64 x 64: 5 points if m ≤ 1700, 0 points if m > 2400

    if (M == 64 && N == 64)
    {
        int i;
        int j;
        int p;
        int tem1;
        int tem2;
        int tem3;
        int tem4;

        for (i = 0; i < M; i += 4)
        {
            for (j = 0; j < N; j += 4)
            {
                for (p = i; p < i + 4; p += 1)
                {
                    tem1 = A[p][j];
                    tem2 = A[p][j + 1];
                    tem3 = A[p][j + 2];
                    tem4 = A[p][j + 3];
                    B[j][p] = tem1;
                    B[j + 1][p] = tem2;
                    B[j + 2][p] = tem3;
                    B[j + 3][p] = tem4;
                }
            }
        }
    }
    else if (M == 32 && N == 32)
    {
        int i;
        int j;
        int p;
        int tem1;
        int tem2;
        int tem3;
        int tem4;
        int tem5;
        int tem6;
        int tem7;
        int tem8;

        for (i = 0; i < M; i += 8)
        {
            for (j = 0; j < N; j += 8)
            {
                for (p = i; p < i + 8; p += 1)
                {
                    tem1 = A[p][j];
                    tem2 = A[p][j + 1];
                    tem3 = A[p][j + 2];
                    tem4 = A[p][j + 3];
                    tem5 = A[p][j + 4];
                    tem6 = A[p][j + 5];
                    tem7 = A[p][j + 6];
                    tem8 = A[p][j + 7];
                    B[j][p] = tem1;
                    B[j + 1][p] = tem2;
                    B[j + 2][p] = tem3;
                    B[j + 3][p] = tem4;
                    B[j + 4][p] = tem5;
                    B[j + 5][p] = tem6;
                    B[j + 6][p] = tem7;
                    B[j + 7][p] = tem8;
                }
            }
        }
    }
}

// You can define additional transpose functions below. We've defined a simple
// one below to help you get started.

/*
 * trans - A simple baseline transpose function, not optimized for the cache.
 */
char trans_desc[] = "Simple row-wise scan transpose";
void trans(int M, int N, int A[M][N], int B[N][M])
{
    int i, j, tmp;

    for (i = 0; i < M; i++)
    {
        for (j = 0; j < N; j++)
        {
            tmp = A[i][j];
            B[j][i] = tmp;
        }
    }
}

/*
 * registerFunctions - This function registers your transpose
 *     functions with the driver.  At runtime, the driver will
 *     evaluate each of the registered functions and summarize their
 *     performance. This is a handy way to experiment with different
 *     transpose strategies.
 */
void registerFunctions()
{
    /* Register your solution function */
    registerTransFunction(transpose_submit, transpose_submit_desc);

    /* Register any additional transpose functions */
    registerTransFunction(trans, trans_desc);
}

/*
 * is_transpose - This helper function checks if B is the transpose of
 *     A. You can check the correctness of your transpose by calling
 *     it before returning from the transpose function.
 */
int is_transpose(int M, int N, int A[M][N], int B[N][M])
{
    int i, j;

    for (i = 0; i < M; i++)
    {
        for (j = 0; j < N; ++j)
        {
            if (A[i][j] != B[j][i])
            {
                return 0;
            }
        }
    }
    return 1;
}

