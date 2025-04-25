
/**
 * Client
**/

import * as runtime from './runtime/library.js';
import $Types = runtime.Types // general types
import $Public = runtime.Types.Public
import $Utils = runtime.Types.Utils
import $Extensions = runtime.Types.Extensions
import $Result = runtime.Types.Result

export type PrismaPromise<T> = $Public.PrismaPromise<T>


/**
 * Model User
 * 
 */
export type User = $Result.DefaultSelection<Prisma.$UserPayload>
/**
 * Model Etudiant
 * 
 */
export type Etudiant = $Result.DefaultSelection<Prisma.$EtudiantPayload>

/**
 * Enums
 */
export namespace $Enums {
  export const Role: {
  admin: 'admin',
  etudiant: 'etudiant'
};

export type Role = (typeof Role)[keyof typeof Role]


export const DiplomeType: {
  licence: 'licence',
  master: 'master'
};

export type DiplomeType = (typeof DiplomeType)[keyof typeof DiplomeType]


export const EtudiantProgression: {
  initial: 'initial',
  metadata: 'metadata',
  data: 'data',
  completed: 'completed'
};

export type EtudiantProgression = (typeof EtudiantProgression)[keyof typeof EtudiantProgression]

}

export type Role = $Enums.Role

export const Role: typeof $Enums.Role

export type DiplomeType = $Enums.DiplomeType

export const DiplomeType: typeof $Enums.DiplomeType

export type EtudiantProgression = $Enums.EtudiantProgression

export const EtudiantProgression: typeof $Enums.EtudiantProgression

/**
 * ##  Prisma Client ʲˢ
 *
 * Type-safe database client for TypeScript & Node.js
 * @example
 * ```
 * const prisma = new PrismaClient()
 * // Fetch zero or more Users
 * const users = await prisma.user.findMany()
 * ```
 *
 *
 * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client).
 */
export class PrismaClient<
  ClientOptions extends Prisma.PrismaClientOptions = Prisma.PrismaClientOptions,
  U = 'log' extends keyof ClientOptions ? ClientOptions['log'] extends Array<Prisma.LogLevel | Prisma.LogDefinition> ? Prisma.GetEvents<ClientOptions['log']> : never : never,
  ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs
> {
  [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['other'] }

    /**
   * ##  Prisma Client ʲˢ
   *
   * Type-safe database client for TypeScript & Node.js
   * @example
   * ```
   * const prisma = new PrismaClient()
   * // Fetch zero or more Users
   * const users = await prisma.user.findMany()
   * ```
   *
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client).
   */

  constructor(optionsArg ?: Prisma.Subset<ClientOptions, Prisma.PrismaClientOptions>);
  $on<V extends U>(eventType: V, callback: (event: V extends 'query' ? Prisma.QueryEvent : Prisma.LogEvent) => void): PrismaClient;

  /**
   * Connect with the database
   */
  $connect(): $Utils.JsPromise<void>;

  /**
   * Disconnect from the database
   */
  $disconnect(): $Utils.JsPromise<void>;

  /**
   * Add a middleware
   * @deprecated since 4.16.0. For new code, prefer client extensions instead.
   * @see https://pris.ly/d/extensions
   */
  $use(cb: Prisma.Middleware): void

/**
   * Executes a prepared raw query and returns the number of affected rows.
   * @example
   * ```
   * const result = await prisma.$executeRaw`UPDATE User SET cool = ${true} WHERE email = ${'user@email.com'};`
   * ```
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $executeRaw<T = unknown>(query: TemplateStringsArray | Prisma.Sql, ...values: any[]): Prisma.PrismaPromise<number>;

  /**
   * Executes a raw query and returns the number of affected rows.
   * Susceptible to SQL injections, see documentation.
   * @example
   * ```
   * const result = await prisma.$executeRawUnsafe('UPDATE User SET cool = $1 WHERE email = $2 ;', true, 'user@email.com')
   * ```
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $executeRawUnsafe<T = unknown>(query: string, ...values: any[]): Prisma.PrismaPromise<number>;

  /**
   * Performs a prepared raw query and returns the `SELECT` data.
   * @example
   * ```
   * const result = await prisma.$queryRaw`SELECT * FROM User WHERE id = ${1} OR email = ${'user@email.com'};`
   * ```
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $queryRaw<T = unknown>(query: TemplateStringsArray | Prisma.Sql, ...values: any[]): Prisma.PrismaPromise<T>;

  /**
   * Performs a raw query and returns the `SELECT` data.
   * Susceptible to SQL injections, see documentation.
   * @example
   * ```
   * const result = await prisma.$queryRawUnsafe('SELECT * FROM User WHERE id = $1 OR email = $2;', 1, 'user@email.com')
   * ```
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $queryRawUnsafe<T = unknown>(query: string, ...values: any[]): Prisma.PrismaPromise<T>;


  /**
   * Allows the running of a sequence of read/write operations that are guaranteed to either succeed or fail as a whole.
   * @example
   * ```
   * const [george, bob, alice] = await prisma.$transaction([
   *   prisma.user.create({ data: { name: 'George' } }),
   *   prisma.user.create({ data: { name: 'Bob' } }),
   *   prisma.user.create({ data: { name: 'Alice' } }),
   * ])
   * ```
   * 
   * Read more in our [docs](https://www.prisma.io/docs/concepts/components/prisma-client/transactions).
   */
  $transaction<P extends Prisma.PrismaPromise<any>[]>(arg: [...P], options?: { isolationLevel?: Prisma.TransactionIsolationLevel }): $Utils.JsPromise<runtime.Types.Utils.UnwrapTuple<P>>

  $transaction<R>(fn: (prisma: Omit<PrismaClient, runtime.ITXClientDenyList>) => $Utils.JsPromise<R>, options?: { maxWait?: number, timeout?: number, isolationLevel?: Prisma.TransactionIsolationLevel }): $Utils.JsPromise<R>


  $extends: $Extensions.ExtendsHook<"extends", Prisma.TypeMapCb<ClientOptions>, ExtArgs, $Utils.Call<Prisma.TypeMapCb<ClientOptions>, {
    extArgs: ExtArgs
  }>>

      /**
   * `prisma.user`: Exposes CRUD operations for the **User** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Users
    * const users = await prisma.user.findMany()
    * ```
    */
  get user(): Prisma.UserDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.etudiant`: Exposes CRUD operations for the **Etudiant** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Etudiants
    * const etudiants = await prisma.etudiant.findMany()
    * ```
    */
  get etudiant(): Prisma.EtudiantDelegate<ExtArgs, ClientOptions>;
}

export namespace Prisma {
  export import DMMF = runtime.DMMF

  export type PrismaPromise<T> = $Public.PrismaPromise<T>

  /**
   * Validator
   */
  export import validator = runtime.Public.validator

  /**
   * Prisma Errors
   */
  export import PrismaClientKnownRequestError = runtime.PrismaClientKnownRequestError
  export import PrismaClientUnknownRequestError = runtime.PrismaClientUnknownRequestError
  export import PrismaClientRustPanicError = runtime.PrismaClientRustPanicError
  export import PrismaClientInitializationError = runtime.PrismaClientInitializationError
  export import PrismaClientValidationError = runtime.PrismaClientValidationError

  /**
   * Re-export of sql-template-tag
   */
  export import sql = runtime.sqltag
  export import empty = runtime.empty
  export import join = runtime.join
  export import raw = runtime.raw
  export import Sql = runtime.Sql



  /**
   * Decimal.js
   */
  export import Decimal = runtime.Decimal

  export type DecimalJsLike = runtime.DecimalJsLike

  /**
   * Metrics
   */
  export type Metrics = runtime.Metrics
  export type Metric<T> = runtime.Metric<T>
  export type MetricHistogram = runtime.MetricHistogram
  export type MetricHistogramBucket = runtime.MetricHistogramBucket

  /**
  * Extensions
  */
  export import Extension = $Extensions.UserArgs
  export import getExtensionContext = runtime.Extensions.getExtensionContext
  export import Args = $Public.Args
  export import Payload = $Public.Payload
  export import Result = $Public.Result
  export import Exact = $Public.Exact

  /**
   * Prisma Client JS version: 6.6.0
   * Query Engine version: f676762280b54cd07c770017ed3711ddde35f37a
   */
  export type PrismaVersion = {
    client: string
  }

  export const prismaVersion: PrismaVersion

  /**
   * Utility Types
   */


  export import JsonObject = runtime.JsonObject
  export import JsonArray = runtime.JsonArray
  export import JsonValue = runtime.JsonValue
  export import InputJsonObject = runtime.InputJsonObject
  export import InputJsonArray = runtime.InputJsonArray
  export import InputJsonValue = runtime.InputJsonValue

  /**
   * Types of the values used to represent different kinds of `null` values when working with JSON fields.
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  namespace NullTypes {
    /**
    * Type of `Prisma.DbNull`.
    *
    * You cannot use other instances of this class. Please use the `Prisma.DbNull` value.
    *
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class DbNull {
      private DbNull: never
      private constructor()
    }

    /**
    * Type of `Prisma.JsonNull`.
    *
    * You cannot use other instances of this class. Please use the `Prisma.JsonNull` value.
    *
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class JsonNull {
      private JsonNull: never
      private constructor()
    }

    /**
    * Type of `Prisma.AnyNull`.
    *
    * You cannot use other instances of this class. Please use the `Prisma.AnyNull` value.
    *
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class AnyNull {
      private AnyNull: never
      private constructor()
    }
  }

  /**
   * Helper for filtering JSON entries that have `null` on the database (empty on the db)
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const DbNull: NullTypes.DbNull

  /**
   * Helper for filtering JSON entries that have JSON `null` values (not empty on the db)
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const JsonNull: NullTypes.JsonNull

  /**
   * Helper for filtering JSON entries that are `Prisma.DbNull` or `Prisma.JsonNull`
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const AnyNull: NullTypes.AnyNull

  type SelectAndInclude = {
    select: any
    include: any
  }

  type SelectAndOmit = {
    select: any
    omit: any
  }

  /**
   * Get the type of the value, that the Promise holds.
   */
  export type PromiseType<T extends PromiseLike<any>> = T extends PromiseLike<infer U> ? U : T;

  /**
   * Get the return type of a function which returns a Promise.
   */
  export type PromiseReturnType<T extends (...args: any) => $Utils.JsPromise<any>> = PromiseType<ReturnType<T>>

  /**
   * From T, pick a set of properties whose keys are in the union K
   */
  type Prisma__Pick<T, K extends keyof T> = {
      [P in K]: T[P];
  };


  export type Enumerable<T> = T | Array<T>;

  export type RequiredKeys<T> = {
    [K in keyof T]-?: {} extends Prisma__Pick<T, K> ? never : K
  }[keyof T]

  export type TruthyKeys<T> = keyof {
    [K in keyof T as T[K] extends false | undefined | null ? never : K]: K
  }

  export type TrueKeys<T> = TruthyKeys<Prisma__Pick<T, RequiredKeys<T>>>

  /**
   * Subset
   * @desc From `T` pick properties that exist in `U`. Simple version of Intersection
   */
  export type Subset<T, U> = {
    [key in keyof T]: key extends keyof U ? T[key] : never;
  };

  /**
   * SelectSubset
   * @desc From `T` pick properties that exist in `U`. Simple version of Intersection.
   * Additionally, it validates, if both select and include are present. If the case, it errors.
   */
  export type SelectSubset<T, U> = {
    [key in keyof T]: key extends keyof U ? T[key] : never
  } &
    (T extends SelectAndInclude
      ? 'Please either choose `select` or `include`.'
      : T extends SelectAndOmit
        ? 'Please either choose `select` or `omit`.'
        : {})

  /**
   * Subset + Intersection
   * @desc From `T` pick properties that exist in `U` and intersect `K`
   */
  export type SubsetIntersection<T, U, K> = {
    [key in keyof T]: key extends keyof U ? T[key] : never
  } &
    K

  type Without<T, U> = { [P in Exclude<keyof T, keyof U>]?: never };

  /**
   * XOR is needed to have a real mutually exclusive union type
   * https://stackoverflow.com/questions/42123407/does-typescript-support-mutually-exclusive-types
   */
  type XOR<T, U> =
    T extends object ?
    U extends object ?
      (Without<T, U> & U) | (Without<U, T> & T)
    : U : T


  /**
   * Is T a Record?
   */
  type IsObject<T extends any> = T extends Array<any>
  ? False
  : T extends Date
  ? False
  : T extends Uint8Array
  ? False
  : T extends BigInt
  ? False
  : T extends object
  ? True
  : False


  /**
   * If it's T[], return T
   */
  export type UnEnumerate<T extends unknown> = T extends Array<infer U> ? U : T

  /**
   * From ts-toolbelt
   */

  type __Either<O extends object, K extends Key> = Omit<O, K> &
    {
      // Merge all but K
      [P in K]: Prisma__Pick<O, P & keyof O> // With K possibilities
    }[K]

  type EitherStrict<O extends object, K extends Key> = Strict<__Either<O, K>>

  type EitherLoose<O extends object, K extends Key> = ComputeRaw<__Either<O, K>>

  type _Either<
    O extends object,
    K extends Key,
    strict extends Boolean
  > = {
    1: EitherStrict<O, K>
    0: EitherLoose<O, K>
  }[strict]

  type Either<
    O extends object,
    K extends Key,
    strict extends Boolean = 1
  > = O extends unknown ? _Either<O, K, strict> : never

  export type Union = any

  type PatchUndefined<O extends object, O1 extends object> = {
    [K in keyof O]: O[K] extends undefined ? At<O1, K> : O[K]
  } & {}

  /** Helper Types for "Merge" **/
  export type IntersectOf<U extends Union> = (
    U extends unknown ? (k: U) => void : never
  ) extends (k: infer I) => void
    ? I
    : never

  export type Overwrite<O extends object, O1 extends object> = {
      [K in keyof O]: K extends keyof O1 ? O1[K] : O[K];
  } & {};

  type _Merge<U extends object> = IntersectOf<Overwrite<U, {
      [K in keyof U]-?: At<U, K>;
  }>>;

  type Key = string | number | symbol;
  type AtBasic<O extends object, K extends Key> = K extends keyof O ? O[K] : never;
  type AtStrict<O extends object, K extends Key> = O[K & keyof O];
  type AtLoose<O extends object, K extends Key> = O extends unknown ? AtStrict<O, K> : never;
  export type At<O extends object, K extends Key, strict extends Boolean = 1> = {
      1: AtStrict<O, K>;
      0: AtLoose<O, K>;
  }[strict];

  export type ComputeRaw<A extends any> = A extends Function ? A : {
    [K in keyof A]: A[K];
  } & {};

  export type OptionalFlat<O> = {
    [K in keyof O]?: O[K];
  } & {};

  type _Record<K extends keyof any, T> = {
    [P in K]: T;
  };

  // cause typescript not to expand types and preserve names
  type NoExpand<T> = T extends unknown ? T : never;

  // this type assumes the passed object is entirely optional
  type AtLeast<O extends object, K extends string> = NoExpand<
    O extends unknown
    ? | (K extends keyof O ? { [P in K]: O[P] } & O : O)
      | {[P in keyof O as P extends K ? P : never]-?: O[P]} & O
    : never>;

  type _Strict<U, _U = U> = U extends unknown ? U & OptionalFlat<_Record<Exclude<Keys<_U>, keyof U>, never>> : never;

  export type Strict<U extends object> = ComputeRaw<_Strict<U>>;
  /** End Helper Types for "Merge" **/

  export type Merge<U extends object> = ComputeRaw<_Merge<Strict<U>>>;

  /**
  A [[Boolean]]
  */
  export type Boolean = True | False

  // /**
  // 1
  // */
  export type True = 1

  /**
  0
  */
  export type False = 0

  export type Not<B extends Boolean> = {
    0: 1
    1: 0
  }[B]

  export type Extends<A1 extends any, A2 extends any> = [A1] extends [never]
    ? 0 // anything `never` is false
    : A1 extends A2
    ? 1
    : 0

  export type Has<U extends Union, U1 extends Union> = Not<
    Extends<Exclude<U1, U>, U1>
  >

  export type Or<B1 extends Boolean, B2 extends Boolean> = {
    0: {
      0: 0
      1: 1
    }
    1: {
      0: 1
      1: 1
    }
  }[B1][B2]

  export type Keys<U extends Union> = U extends unknown ? keyof U : never

  type Cast<A, B> = A extends B ? A : B;

  export const type: unique symbol;



  /**
   * Used by group by
   */

  export type GetScalarType<T, O> = O extends object ? {
    [P in keyof T]: P extends keyof O
      ? O[P]
      : never
  } : never

  type FieldPaths<
    T,
    U = Omit<T, '_avg' | '_sum' | '_count' | '_min' | '_max'>
  > = IsObject<T> extends True ? U : T

  type GetHavingFields<T> = {
    [K in keyof T]: Or<
      Or<Extends<'OR', K>, Extends<'AND', K>>,
      Extends<'NOT', K>
    > extends True
      ? // infer is only needed to not hit TS limit
        // based on the brilliant idea of Pierre-Antoine Mills
        // https://github.com/microsoft/TypeScript/issues/30188#issuecomment-478938437
        T[K] extends infer TK
        ? GetHavingFields<UnEnumerate<TK> extends object ? Merge<UnEnumerate<TK>> : never>
        : never
      : {} extends FieldPaths<T[K]>
      ? never
      : K
  }[keyof T]

  /**
   * Convert tuple to union
   */
  type _TupleToUnion<T> = T extends (infer E)[] ? E : never
  type TupleToUnion<K extends readonly any[]> = _TupleToUnion<K>
  type MaybeTupleToUnion<T> = T extends any[] ? TupleToUnion<T> : T

  /**
   * Like `Pick`, but additionally can also accept an array of keys
   */
  type PickEnumerable<T, K extends Enumerable<keyof T> | keyof T> = Prisma__Pick<T, MaybeTupleToUnion<K>>

  /**
   * Exclude all keys with underscores
   */
  type ExcludeUnderscoreKeys<T extends string> = T extends `_${string}` ? never : T


  export type FieldRef<Model, FieldType> = runtime.FieldRef<Model, FieldType>

  type FieldRefInputType<Model, FieldType> = Model extends never ? never : FieldRef<Model, FieldType>


  export const ModelName: {
    User: 'User',
    Etudiant: 'Etudiant'
  };

  export type ModelName = (typeof ModelName)[keyof typeof ModelName]


  export type Datasources = {
    db?: Datasource
  }

  interface TypeMapCb<ClientOptions = {}> extends $Utils.Fn<{extArgs: $Extensions.InternalArgs }, $Utils.Record<string, any>> {
    returns: Prisma.TypeMap<this['params']['extArgs'], ClientOptions extends { omit: infer OmitOptions } ? OmitOptions : {}>
  }

  export type TypeMap<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> = {
    globalOmitOptions: {
      omit: GlobalOmitOptions
    }
    meta: {
      modelProps: "user" | "etudiant"
      txIsolationLevel: Prisma.TransactionIsolationLevel
    }
    model: {
      User: {
        payload: Prisma.$UserPayload<ExtArgs>
        fields: Prisma.UserFieldRefs
        operations: {
          findUnique: {
            args: Prisma.UserFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.UserFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          findFirst: {
            args: Prisma.UserFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.UserFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          findMany: {
            args: Prisma.UserFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>[]
          }
          create: {
            args: Prisma.UserCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          createMany: {
            args: Prisma.UserCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.UserCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>[]
          }
          delete: {
            args: Prisma.UserDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          update: {
            args: Prisma.UserUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          deleteMany: {
            args: Prisma.UserDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.UserUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.UserUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>[]
          }
          upsert: {
            args: Prisma.UserUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          aggregate: {
            args: Prisma.UserAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateUser>
          }
          groupBy: {
            args: Prisma.UserGroupByArgs<ExtArgs>
            result: $Utils.Optional<UserGroupByOutputType>[]
          }
          count: {
            args: Prisma.UserCountArgs<ExtArgs>
            result: $Utils.Optional<UserCountAggregateOutputType> | number
          }
        }
      }
      Etudiant: {
        payload: Prisma.$EtudiantPayload<ExtArgs>
        fields: Prisma.EtudiantFieldRefs
        operations: {
          findUnique: {
            args: Prisma.EtudiantFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$EtudiantPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.EtudiantFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$EtudiantPayload>
          }
          findFirst: {
            args: Prisma.EtudiantFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$EtudiantPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.EtudiantFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$EtudiantPayload>
          }
          findMany: {
            args: Prisma.EtudiantFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$EtudiantPayload>[]
          }
          create: {
            args: Prisma.EtudiantCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$EtudiantPayload>
          }
          createMany: {
            args: Prisma.EtudiantCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.EtudiantCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$EtudiantPayload>[]
          }
          delete: {
            args: Prisma.EtudiantDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$EtudiantPayload>
          }
          update: {
            args: Prisma.EtudiantUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$EtudiantPayload>
          }
          deleteMany: {
            args: Prisma.EtudiantDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.EtudiantUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.EtudiantUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$EtudiantPayload>[]
          }
          upsert: {
            args: Prisma.EtudiantUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$EtudiantPayload>
          }
          aggregate: {
            args: Prisma.EtudiantAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateEtudiant>
          }
          groupBy: {
            args: Prisma.EtudiantGroupByArgs<ExtArgs>
            result: $Utils.Optional<EtudiantGroupByOutputType>[]
          }
          count: {
            args: Prisma.EtudiantCountArgs<ExtArgs>
            result: $Utils.Optional<EtudiantCountAggregateOutputType> | number
          }
        }
      }
    }
  } & {
    other: {
      payload: any
      operations: {
        $executeRaw: {
          args: [query: TemplateStringsArray | Prisma.Sql, ...values: any[]],
          result: any
        }
        $executeRawUnsafe: {
          args: [query: string, ...values: any[]],
          result: any
        }
        $queryRaw: {
          args: [query: TemplateStringsArray | Prisma.Sql, ...values: any[]],
          result: any
        }
        $queryRawUnsafe: {
          args: [query: string, ...values: any[]],
          result: any
        }
      }
    }
  }
  export const defineExtension: $Extensions.ExtendsHook<"define", Prisma.TypeMapCb, $Extensions.DefaultArgs>
  export type DefaultPrismaClient = PrismaClient
  export type ErrorFormat = 'pretty' | 'colorless' | 'minimal'
  export interface PrismaClientOptions {
    /**
     * Overwrites the datasource url from your schema.prisma file
     */
    datasources?: Datasources
    /**
     * Overwrites the datasource url from your schema.prisma file
     */
    datasourceUrl?: string
    /**
     * @default "colorless"
     */
    errorFormat?: ErrorFormat
    /**
     * @example
     * ```
     * // Defaults to stdout
     * log: ['query', 'info', 'warn', 'error']
     * 
     * // Emit as events
     * log: [
     *   { emit: 'stdout', level: 'query' },
     *   { emit: 'stdout', level: 'info' },
     *   { emit: 'stdout', level: 'warn' }
     *   { emit: 'stdout', level: 'error' }
     * ]
     * ```
     * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/logging#the-log-option).
     */
    log?: (LogLevel | LogDefinition)[]
    /**
     * The default values for transactionOptions
     * maxWait ?= 2000
     * timeout ?= 5000
     */
    transactionOptions?: {
      maxWait?: number
      timeout?: number
      isolationLevel?: Prisma.TransactionIsolationLevel
    }
    /**
     * Global configuration for omitting model fields by default.
     * 
     * @example
     * ```
     * const prisma = new PrismaClient({
     *   omit: {
     *     user: {
     *       password: true
     *     }
     *   }
     * })
     * ```
     */
    omit?: Prisma.GlobalOmitConfig
  }
  export type GlobalOmitConfig = {
    user?: UserOmit
    etudiant?: EtudiantOmit
  }

  /* Types for Logging */
  export type LogLevel = 'info' | 'query' | 'warn' | 'error'
  export type LogDefinition = {
    level: LogLevel
    emit: 'stdout' | 'event'
  }

  export type GetLogType<T extends LogLevel | LogDefinition> = T extends LogDefinition ? T['emit'] extends 'event' ? T['level'] : never : never
  export type GetEvents<T extends any> = T extends Array<LogLevel | LogDefinition> ?
    GetLogType<T[0]> | GetLogType<T[1]> | GetLogType<T[2]> | GetLogType<T[3]>
    : never

  export type QueryEvent = {
    timestamp: Date
    query: string
    params: string
    duration: number
    target: string
  }

  export type LogEvent = {
    timestamp: Date
    message: string
    target: string
  }
  /* End Types for Logging */


  export type PrismaAction =
    | 'findUnique'
    | 'findUniqueOrThrow'
    | 'findMany'
    | 'findFirst'
    | 'findFirstOrThrow'
    | 'create'
    | 'createMany'
    | 'createManyAndReturn'
    | 'update'
    | 'updateMany'
    | 'updateManyAndReturn'
    | 'upsert'
    | 'delete'
    | 'deleteMany'
    | 'executeRaw'
    | 'queryRaw'
    | 'aggregate'
    | 'count'
    | 'runCommandRaw'
    | 'findRaw'
    | 'groupBy'

  /**
   * These options are being passed into the middleware as "params"
   */
  export type MiddlewareParams = {
    model?: ModelName
    action: PrismaAction
    args: any
    dataPath: string[]
    runInTransaction: boolean
  }

  /**
   * The `T` type makes sure, that the `return proceed` is not forgotten in the middleware implementation
   */
  export type Middleware<T = any> = (
    params: MiddlewareParams,
    next: (params: MiddlewareParams) => $Utils.JsPromise<T>,
  ) => $Utils.JsPromise<T>

  // tested in getLogLevel.test.ts
  export function getLogLevel(log: Array<LogLevel | LogDefinition>): LogLevel | undefined;

  /**
   * `PrismaClient` proxy available in interactive transactions.
   */
  export type TransactionClient = Omit<Prisma.DefaultPrismaClient, runtime.ITXClientDenyList>

  export type Datasource = {
    url?: string
  }

  /**
   * Count Types
   */



  /**
   * Models
   */

  /**
   * Model User
   */

  export type AggregateUser = {
    _count: UserCountAggregateOutputType | null
    _min: UserMinAggregateOutputType | null
    _max: UserMaxAggregateOutputType | null
  }

  export type UserMinAggregateOutputType = {
    id: string | null
    email: string | null
    password: string | null
    role: $Enums.Role | null
    nom: string | null
    prenom: string | null
    dateCreation: Date | null
    dateModification: Date | null
  }

  export type UserMaxAggregateOutputType = {
    id: string | null
    email: string | null
    password: string | null
    role: $Enums.Role | null
    nom: string | null
    prenom: string | null
    dateCreation: Date | null
    dateModification: Date | null
  }

  export type UserCountAggregateOutputType = {
    id: number
    email: number
    password: number
    role: number
    nom: number
    prenom: number
    dateCreation: number
    dateModification: number
    _all: number
  }


  export type UserMinAggregateInputType = {
    id?: true
    email?: true
    password?: true
    role?: true
    nom?: true
    prenom?: true
    dateCreation?: true
    dateModification?: true
  }

  export type UserMaxAggregateInputType = {
    id?: true
    email?: true
    password?: true
    role?: true
    nom?: true
    prenom?: true
    dateCreation?: true
    dateModification?: true
  }

  export type UserCountAggregateInputType = {
    id?: true
    email?: true
    password?: true
    role?: true
    nom?: true
    prenom?: true
    dateCreation?: true
    dateModification?: true
    _all?: true
  }

  export type UserAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which User to aggregate.
     */
    where?: UserWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Users to fetch.
     */
    orderBy?: UserOrderByWithRelationInput | UserOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: UserWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Users from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Users.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Users
    **/
    _count?: true | UserCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: UserMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: UserMaxAggregateInputType
  }

  export type GetUserAggregateType<T extends UserAggregateArgs> = {
        [P in keyof T & keyof AggregateUser]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateUser[P]>
      : GetScalarType<T[P], AggregateUser[P]>
  }




  export type UserGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: UserWhereInput
    orderBy?: UserOrderByWithAggregationInput | UserOrderByWithAggregationInput[]
    by: UserScalarFieldEnum[] | UserScalarFieldEnum
    having?: UserScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: UserCountAggregateInputType | true
    _min?: UserMinAggregateInputType
    _max?: UserMaxAggregateInputType
  }

  export type UserGroupByOutputType = {
    id: string
    email: string
    password: string
    role: $Enums.Role
    nom: string
    prenom: string
    dateCreation: Date
    dateModification: Date
    _count: UserCountAggregateOutputType | null
    _min: UserMinAggregateOutputType | null
    _max: UserMaxAggregateOutputType | null
  }

  type GetUserGroupByPayload<T extends UserGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<UserGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof UserGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], UserGroupByOutputType[P]>
            : GetScalarType<T[P], UserGroupByOutputType[P]>
        }
      >
    >


  export type UserSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    email?: boolean
    password?: boolean
    role?: boolean
    nom?: boolean
    prenom?: boolean
    dateCreation?: boolean
    dateModification?: boolean
    etudiant?: boolean | User$etudiantArgs<ExtArgs>
  }, ExtArgs["result"]["user"]>

  export type UserSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    email?: boolean
    password?: boolean
    role?: boolean
    nom?: boolean
    prenom?: boolean
    dateCreation?: boolean
    dateModification?: boolean
  }, ExtArgs["result"]["user"]>

  export type UserSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    email?: boolean
    password?: boolean
    role?: boolean
    nom?: boolean
    prenom?: boolean
    dateCreation?: boolean
    dateModification?: boolean
  }, ExtArgs["result"]["user"]>

  export type UserSelectScalar = {
    id?: boolean
    email?: boolean
    password?: boolean
    role?: boolean
    nom?: boolean
    prenom?: boolean
    dateCreation?: boolean
    dateModification?: boolean
  }

  export type UserOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "email" | "password" | "role" | "nom" | "prenom" | "dateCreation" | "dateModification", ExtArgs["result"]["user"]>
  export type UserInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    etudiant?: boolean | User$etudiantArgs<ExtArgs>
  }
  export type UserIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}
  export type UserIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}

  export type $UserPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "User"
    objects: {
      etudiant: Prisma.$EtudiantPayload<ExtArgs> | null
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      email: string
      password: string
      role: $Enums.Role
      nom: string
      prenom: string
      dateCreation: Date
      dateModification: Date
    }, ExtArgs["result"]["user"]>
    composites: {}
  }

  type UserGetPayload<S extends boolean | null | undefined | UserDefaultArgs> = $Result.GetResult<Prisma.$UserPayload, S>

  type UserCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<UserFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: UserCountAggregateInputType | true
    }

  export interface UserDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['User'], meta: { name: 'User' } }
    /**
     * Find zero or one User that matches the filter.
     * @param {UserFindUniqueArgs} args - Arguments to find a User
     * @example
     * // Get one User
     * const user = await prisma.user.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends UserFindUniqueArgs>(args: SelectSubset<T, UserFindUniqueArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one User that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {UserFindUniqueOrThrowArgs} args - Arguments to find a User
     * @example
     * // Get one User
     * const user = await prisma.user.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends UserFindUniqueOrThrowArgs>(args: SelectSubset<T, UserFindUniqueOrThrowArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first User that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserFindFirstArgs} args - Arguments to find a User
     * @example
     * // Get one User
     * const user = await prisma.user.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends UserFindFirstArgs>(args?: SelectSubset<T, UserFindFirstArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first User that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserFindFirstOrThrowArgs} args - Arguments to find a User
     * @example
     * // Get one User
     * const user = await prisma.user.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends UserFindFirstOrThrowArgs>(args?: SelectSubset<T, UserFindFirstOrThrowArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Users that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Users
     * const users = await prisma.user.findMany()
     * 
     * // Get first 10 Users
     * const users = await prisma.user.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const userWithIdOnly = await prisma.user.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends UserFindManyArgs>(args?: SelectSubset<T, UserFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a User.
     * @param {UserCreateArgs} args - Arguments to create a User.
     * @example
     * // Create one User
     * const User = await prisma.user.create({
     *   data: {
     *     // ... data to create a User
     *   }
     * })
     * 
     */
    create<T extends UserCreateArgs>(args: SelectSubset<T, UserCreateArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Users.
     * @param {UserCreateManyArgs} args - Arguments to create many Users.
     * @example
     * // Create many Users
     * const user = await prisma.user.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends UserCreateManyArgs>(args?: SelectSubset<T, UserCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Users and returns the data saved in the database.
     * @param {UserCreateManyAndReturnArgs} args - Arguments to create many Users.
     * @example
     * // Create many Users
     * const user = await prisma.user.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Users and only return the `id`
     * const userWithIdOnly = await prisma.user.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends UserCreateManyAndReturnArgs>(args?: SelectSubset<T, UserCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a User.
     * @param {UserDeleteArgs} args - Arguments to delete one User.
     * @example
     * // Delete one User
     * const User = await prisma.user.delete({
     *   where: {
     *     // ... filter to delete one User
     *   }
     * })
     * 
     */
    delete<T extends UserDeleteArgs>(args: SelectSubset<T, UserDeleteArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one User.
     * @param {UserUpdateArgs} args - Arguments to update one User.
     * @example
     * // Update one User
     * const user = await prisma.user.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends UserUpdateArgs>(args: SelectSubset<T, UserUpdateArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Users.
     * @param {UserDeleteManyArgs} args - Arguments to filter Users to delete.
     * @example
     * // Delete a few Users
     * const { count } = await prisma.user.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends UserDeleteManyArgs>(args?: SelectSubset<T, UserDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Users.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Users
     * const user = await prisma.user.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends UserUpdateManyArgs>(args: SelectSubset<T, UserUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Users and returns the data updated in the database.
     * @param {UserUpdateManyAndReturnArgs} args - Arguments to update many Users.
     * @example
     * // Update many Users
     * const user = await prisma.user.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Users and only return the `id`
     * const userWithIdOnly = await prisma.user.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends UserUpdateManyAndReturnArgs>(args: SelectSubset<T, UserUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one User.
     * @param {UserUpsertArgs} args - Arguments to update or create a User.
     * @example
     * // Update or create a User
     * const user = await prisma.user.upsert({
     *   create: {
     *     // ... data to create a User
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the User we want to update
     *   }
     * })
     */
    upsert<T extends UserUpsertArgs>(args: SelectSubset<T, UserUpsertArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Users.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserCountArgs} args - Arguments to filter Users to count.
     * @example
     * // Count the number of Users
     * const count = await prisma.user.count({
     *   where: {
     *     // ... the filter for the Users we want to count
     *   }
     * })
    **/
    count<T extends UserCountArgs>(
      args?: Subset<T, UserCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], UserCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a User.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends UserAggregateArgs>(args: Subset<T, UserAggregateArgs>): Prisma.PrismaPromise<GetUserAggregateType<T>>

    /**
     * Group by User.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends UserGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: UserGroupByArgs['orderBy'] }
        : { orderBy?: UserGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, UserGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetUserGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the User model
   */
  readonly fields: UserFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for User.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__UserClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    etudiant<T extends User$etudiantArgs<ExtArgs> = {}>(args?: Subset<T, User$etudiantArgs<ExtArgs>>): Prisma__EtudiantClient<$Result.GetResult<Prisma.$EtudiantPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the User model
   */
  interface UserFieldRefs {
    readonly id: FieldRef<"User", 'String'>
    readonly email: FieldRef<"User", 'String'>
    readonly password: FieldRef<"User", 'String'>
    readonly role: FieldRef<"User", 'Role'>
    readonly nom: FieldRef<"User", 'String'>
    readonly prenom: FieldRef<"User", 'String'>
    readonly dateCreation: FieldRef<"User", 'DateTime'>
    readonly dateModification: FieldRef<"User", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * User findUnique
   */
  export type UserFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter, which User to fetch.
     */
    where: UserWhereUniqueInput
  }

  /**
   * User findUniqueOrThrow
   */
  export type UserFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter, which User to fetch.
     */
    where: UserWhereUniqueInput
  }

  /**
   * User findFirst
   */
  export type UserFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter, which User to fetch.
     */
    where?: UserWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Users to fetch.
     */
    orderBy?: UserOrderByWithRelationInput | UserOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Users.
     */
    cursor?: UserWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Users from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Users.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Users.
     */
    distinct?: UserScalarFieldEnum | UserScalarFieldEnum[]
  }

  /**
   * User findFirstOrThrow
   */
  export type UserFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter, which User to fetch.
     */
    where?: UserWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Users to fetch.
     */
    orderBy?: UserOrderByWithRelationInput | UserOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Users.
     */
    cursor?: UserWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Users from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Users.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Users.
     */
    distinct?: UserScalarFieldEnum | UserScalarFieldEnum[]
  }

  /**
   * User findMany
   */
  export type UserFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter, which Users to fetch.
     */
    where?: UserWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Users to fetch.
     */
    orderBy?: UserOrderByWithRelationInput | UserOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Users.
     */
    cursor?: UserWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Users from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Users.
     */
    skip?: number
    distinct?: UserScalarFieldEnum | UserScalarFieldEnum[]
  }

  /**
   * User create
   */
  export type UserCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * The data needed to create a User.
     */
    data: XOR<UserCreateInput, UserUncheckedCreateInput>
  }

  /**
   * User createMany
   */
  export type UserCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Users.
     */
    data: UserCreateManyInput | UserCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * User createManyAndReturn
   */
  export type UserCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * The data used to create many Users.
     */
    data: UserCreateManyInput | UserCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * User update
   */
  export type UserUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * The data needed to update a User.
     */
    data: XOR<UserUpdateInput, UserUncheckedUpdateInput>
    /**
     * Choose, which User to update.
     */
    where: UserWhereUniqueInput
  }

  /**
   * User updateMany
   */
  export type UserUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Users.
     */
    data: XOR<UserUpdateManyMutationInput, UserUncheckedUpdateManyInput>
    /**
     * Filter which Users to update
     */
    where?: UserWhereInput
    /**
     * Limit how many Users to update.
     */
    limit?: number
  }

  /**
   * User updateManyAndReturn
   */
  export type UserUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * The data used to update Users.
     */
    data: XOR<UserUpdateManyMutationInput, UserUncheckedUpdateManyInput>
    /**
     * Filter which Users to update
     */
    where?: UserWhereInput
    /**
     * Limit how many Users to update.
     */
    limit?: number
  }

  /**
   * User upsert
   */
  export type UserUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * The filter to search for the User to update in case it exists.
     */
    where: UserWhereUniqueInput
    /**
     * In case the User found by the `where` argument doesn't exist, create a new User with this data.
     */
    create: XOR<UserCreateInput, UserUncheckedCreateInput>
    /**
     * In case the User was found with the provided `where` argument, update it with this data.
     */
    update: XOR<UserUpdateInput, UserUncheckedUpdateInput>
  }

  /**
   * User delete
   */
  export type UserDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter which User to delete.
     */
    where: UserWhereUniqueInput
  }

  /**
   * User deleteMany
   */
  export type UserDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Users to delete
     */
    where?: UserWhereInput
    /**
     * Limit how many Users to delete.
     */
    limit?: number
  }

  /**
   * User.etudiant
   */
  export type User$etudiantArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Etudiant
     */
    select?: EtudiantSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Etudiant
     */
    omit?: EtudiantOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: EtudiantInclude<ExtArgs> | null
    where?: EtudiantWhereInput
  }

  /**
   * User without action
   */
  export type UserDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
  }


  /**
   * Model Etudiant
   */

  export type AggregateEtudiant = {
    _count: EtudiantCountAggregateOutputType | null
    _min: EtudiantMinAggregateOutputType | null
    _max: EtudiantMaxAggregateOutputType | null
  }

  export type EtudiantMinAggregateOutputType = {
    id: string | null
    numeroInscription: string | null
    dateNaissance: Date | null
    lieuNaissance: string | null
    domaine: string | null
    filiere: string | null
    specialite: string | null
    diplomeType: $Enums.DiplomeType | null
    anneeUniversitaireDebut: string | null
    progression: $Enums.EtudiantProgression | null
    setupCompleted: boolean | null
  }

  export type EtudiantMaxAggregateOutputType = {
    id: string | null
    numeroInscription: string | null
    dateNaissance: Date | null
    lieuNaissance: string | null
    domaine: string | null
    filiere: string | null
    specialite: string | null
    diplomeType: $Enums.DiplomeType | null
    anneeUniversitaireDebut: string | null
    progression: $Enums.EtudiantProgression | null
    setupCompleted: boolean | null
  }

  export type EtudiantCountAggregateOutputType = {
    id: number
    numeroInscription: number
    dateNaissance: number
    lieuNaissance: number
    domaine: number
    filiere: number
    specialite: number
    diplomeType: number
    anneeUniversitaireDebut: number
    progression: number
    setupCompleted: number
    _all: number
  }


  export type EtudiantMinAggregateInputType = {
    id?: true
    numeroInscription?: true
    dateNaissance?: true
    lieuNaissance?: true
    domaine?: true
    filiere?: true
    specialite?: true
    diplomeType?: true
    anneeUniversitaireDebut?: true
    progression?: true
    setupCompleted?: true
  }

  export type EtudiantMaxAggregateInputType = {
    id?: true
    numeroInscription?: true
    dateNaissance?: true
    lieuNaissance?: true
    domaine?: true
    filiere?: true
    specialite?: true
    diplomeType?: true
    anneeUniversitaireDebut?: true
    progression?: true
    setupCompleted?: true
  }

  export type EtudiantCountAggregateInputType = {
    id?: true
    numeroInscription?: true
    dateNaissance?: true
    lieuNaissance?: true
    domaine?: true
    filiere?: true
    specialite?: true
    diplomeType?: true
    anneeUniversitaireDebut?: true
    progression?: true
    setupCompleted?: true
    _all?: true
  }

  export type EtudiantAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Etudiant to aggregate.
     */
    where?: EtudiantWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Etudiants to fetch.
     */
    orderBy?: EtudiantOrderByWithRelationInput | EtudiantOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: EtudiantWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Etudiants from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Etudiants.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Etudiants
    **/
    _count?: true | EtudiantCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: EtudiantMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: EtudiantMaxAggregateInputType
  }

  export type GetEtudiantAggregateType<T extends EtudiantAggregateArgs> = {
        [P in keyof T & keyof AggregateEtudiant]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateEtudiant[P]>
      : GetScalarType<T[P], AggregateEtudiant[P]>
  }




  export type EtudiantGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: EtudiantWhereInput
    orderBy?: EtudiantOrderByWithAggregationInput | EtudiantOrderByWithAggregationInput[]
    by: EtudiantScalarFieldEnum[] | EtudiantScalarFieldEnum
    having?: EtudiantScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: EtudiantCountAggregateInputType | true
    _min?: EtudiantMinAggregateInputType
    _max?: EtudiantMaxAggregateInputType
  }

  export type EtudiantGroupByOutputType = {
    id: string
    numeroInscription: string
    dateNaissance: Date | null
    lieuNaissance: string | null
    domaine: string | null
    filiere: string | null
    specialite: string | null
    diplomeType: $Enums.DiplomeType | null
    anneeUniversitaireDebut: string | null
    progression: $Enums.EtudiantProgression
    setupCompleted: boolean
    _count: EtudiantCountAggregateOutputType | null
    _min: EtudiantMinAggregateOutputType | null
    _max: EtudiantMaxAggregateOutputType | null
  }

  type GetEtudiantGroupByPayload<T extends EtudiantGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<EtudiantGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof EtudiantGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], EtudiantGroupByOutputType[P]>
            : GetScalarType<T[P], EtudiantGroupByOutputType[P]>
        }
      >
    >


  export type EtudiantSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    numeroInscription?: boolean
    dateNaissance?: boolean
    lieuNaissance?: boolean
    domaine?: boolean
    filiere?: boolean
    specialite?: boolean
    diplomeType?: boolean
    anneeUniversitaireDebut?: boolean
    progression?: boolean
    setupCompleted?: boolean
    user?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["etudiant"]>

  export type EtudiantSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    numeroInscription?: boolean
    dateNaissance?: boolean
    lieuNaissance?: boolean
    domaine?: boolean
    filiere?: boolean
    specialite?: boolean
    diplomeType?: boolean
    anneeUniversitaireDebut?: boolean
    progression?: boolean
    setupCompleted?: boolean
    user?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["etudiant"]>

  export type EtudiantSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    numeroInscription?: boolean
    dateNaissance?: boolean
    lieuNaissance?: boolean
    domaine?: boolean
    filiere?: boolean
    specialite?: boolean
    diplomeType?: boolean
    anneeUniversitaireDebut?: boolean
    progression?: boolean
    setupCompleted?: boolean
    user?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["etudiant"]>

  export type EtudiantSelectScalar = {
    id?: boolean
    numeroInscription?: boolean
    dateNaissance?: boolean
    lieuNaissance?: boolean
    domaine?: boolean
    filiere?: boolean
    specialite?: boolean
    diplomeType?: boolean
    anneeUniversitaireDebut?: boolean
    progression?: boolean
    setupCompleted?: boolean
  }

  export type EtudiantOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "numeroInscription" | "dateNaissance" | "lieuNaissance" | "domaine" | "filiere" | "specialite" | "diplomeType" | "anneeUniversitaireDebut" | "progression" | "setupCompleted", ExtArgs["result"]["etudiant"]>
  export type EtudiantInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UserDefaultArgs<ExtArgs>
  }
  export type EtudiantIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UserDefaultArgs<ExtArgs>
  }
  export type EtudiantIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UserDefaultArgs<ExtArgs>
  }

  export type $EtudiantPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Etudiant"
    objects: {
      user: Prisma.$UserPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      numeroInscription: string
      dateNaissance: Date | null
      lieuNaissance: string | null
      domaine: string | null
      filiere: string | null
      specialite: string | null
      diplomeType: $Enums.DiplomeType | null
      anneeUniversitaireDebut: string | null
      progression: $Enums.EtudiantProgression
      setupCompleted: boolean
    }, ExtArgs["result"]["etudiant"]>
    composites: {}
  }

  type EtudiantGetPayload<S extends boolean | null | undefined | EtudiantDefaultArgs> = $Result.GetResult<Prisma.$EtudiantPayload, S>

  type EtudiantCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<EtudiantFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: EtudiantCountAggregateInputType | true
    }

  export interface EtudiantDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Etudiant'], meta: { name: 'Etudiant' } }
    /**
     * Find zero or one Etudiant that matches the filter.
     * @param {EtudiantFindUniqueArgs} args - Arguments to find a Etudiant
     * @example
     * // Get one Etudiant
     * const etudiant = await prisma.etudiant.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends EtudiantFindUniqueArgs>(args: SelectSubset<T, EtudiantFindUniqueArgs<ExtArgs>>): Prisma__EtudiantClient<$Result.GetResult<Prisma.$EtudiantPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Etudiant that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {EtudiantFindUniqueOrThrowArgs} args - Arguments to find a Etudiant
     * @example
     * // Get one Etudiant
     * const etudiant = await prisma.etudiant.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends EtudiantFindUniqueOrThrowArgs>(args: SelectSubset<T, EtudiantFindUniqueOrThrowArgs<ExtArgs>>): Prisma__EtudiantClient<$Result.GetResult<Prisma.$EtudiantPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Etudiant that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {EtudiantFindFirstArgs} args - Arguments to find a Etudiant
     * @example
     * // Get one Etudiant
     * const etudiant = await prisma.etudiant.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends EtudiantFindFirstArgs>(args?: SelectSubset<T, EtudiantFindFirstArgs<ExtArgs>>): Prisma__EtudiantClient<$Result.GetResult<Prisma.$EtudiantPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Etudiant that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {EtudiantFindFirstOrThrowArgs} args - Arguments to find a Etudiant
     * @example
     * // Get one Etudiant
     * const etudiant = await prisma.etudiant.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends EtudiantFindFirstOrThrowArgs>(args?: SelectSubset<T, EtudiantFindFirstOrThrowArgs<ExtArgs>>): Prisma__EtudiantClient<$Result.GetResult<Prisma.$EtudiantPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Etudiants that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {EtudiantFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Etudiants
     * const etudiants = await prisma.etudiant.findMany()
     * 
     * // Get first 10 Etudiants
     * const etudiants = await prisma.etudiant.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const etudiantWithIdOnly = await prisma.etudiant.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends EtudiantFindManyArgs>(args?: SelectSubset<T, EtudiantFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$EtudiantPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Etudiant.
     * @param {EtudiantCreateArgs} args - Arguments to create a Etudiant.
     * @example
     * // Create one Etudiant
     * const Etudiant = await prisma.etudiant.create({
     *   data: {
     *     // ... data to create a Etudiant
     *   }
     * })
     * 
     */
    create<T extends EtudiantCreateArgs>(args: SelectSubset<T, EtudiantCreateArgs<ExtArgs>>): Prisma__EtudiantClient<$Result.GetResult<Prisma.$EtudiantPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Etudiants.
     * @param {EtudiantCreateManyArgs} args - Arguments to create many Etudiants.
     * @example
     * // Create many Etudiants
     * const etudiant = await prisma.etudiant.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends EtudiantCreateManyArgs>(args?: SelectSubset<T, EtudiantCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Etudiants and returns the data saved in the database.
     * @param {EtudiantCreateManyAndReturnArgs} args - Arguments to create many Etudiants.
     * @example
     * // Create many Etudiants
     * const etudiant = await prisma.etudiant.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Etudiants and only return the `id`
     * const etudiantWithIdOnly = await prisma.etudiant.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends EtudiantCreateManyAndReturnArgs>(args?: SelectSubset<T, EtudiantCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$EtudiantPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Etudiant.
     * @param {EtudiantDeleteArgs} args - Arguments to delete one Etudiant.
     * @example
     * // Delete one Etudiant
     * const Etudiant = await prisma.etudiant.delete({
     *   where: {
     *     // ... filter to delete one Etudiant
     *   }
     * })
     * 
     */
    delete<T extends EtudiantDeleteArgs>(args: SelectSubset<T, EtudiantDeleteArgs<ExtArgs>>): Prisma__EtudiantClient<$Result.GetResult<Prisma.$EtudiantPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Etudiant.
     * @param {EtudiantUpdateArgs} args - Arguments to update one Etudiant.
     * @example
     * // Update one Etudiant
     * const etudiant = await prisma.etudiant.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends EtudiantUpdateArgs>(args: SelectSubset<T, EtudiantUpdateArgs<ExtArgs>>): Prisma__EtudiantClient<$Result.GetResult<Prisma.$EtudiantPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Etudiants.
     * @param {EtudiantDeleteManyArgs} args - Arguments to filter Etudiants to delete.
     * @example
     * // Delete a few Etudiants
     * const { count } = await prisma.etudiant.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends EtudiantDeleteManyArgs>(args?: SelectSubset<T, EtudiantDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Etudiants.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {EtudiantUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Etudiants
     * const etudiant = await prisma.etudiant.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends EtudiantUpdateManyArgs>(args: SelectSubset<T, EtudiantUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Etudiants and returns the data updated in the database.
     * @param {EtudiantUpdateManyAndReturnArgs} args - Arguments to update many Etudiants.
     * @example
     * // Update many Etudiants
     * const etudiant = await prisma.etudiant.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Etudiants and only return the `id`
     * const etudiantWithIdOnly = await prisma.etudiant.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends EtudiantUpdateManyAndReturnArgs>(args: SelectSubset<T, EtudiantUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$EtudiantPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one Etudiant.
     * @param {EtudiantUpsertArgs} args - Arguments to update or create a Etudiant.
     * @example
     * // Update or create a Etudiant
     * const etudiant = await prisma.etudiant.upsert({
     *   create: {
     *     // ... data to create a Etudiant
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Etudiant we want to update
     *   }
     * })
     */
    upsert<T extends EtudiantUpsertArgs>(args: SelectSubset<T, EtudiantUpsertArgs<ExtArgs>>): Prisma__EtudiantClient<$Result.GetResult<Prisma.$EtudiantPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Etudiants.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {EtudiantCountArgs} args - Arguments to filter Etudiants to count.
     * @example
     * // Count the number of Etudiants
     * const count = await prisma.etudiant.count({
     *   where: {
     *     // ... the filter for the Etudiants we want to count
     *   }
     * })
    **/
    count<T extends EtudiantCountArgs>(
      args?: Subset<T, EtudiantCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], EtudiantCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Etudiant.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {EtudiantAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends EtudiantAggregateArgs>(args: Subset<T, EtudiantAggregateArgs>): Prisma.PrismaPromise<GetEtudiantAggregateType<T>>

    /**
     * Group by Etudiant.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {EtudiantGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends EtudiantGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: EtudiantGroupByArgs['orderBy'] }
        : { orderBy?: EtudiantGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, EtudiantGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetEtudiantGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Etudiant model
   */
  readonly fields: EtudiantFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Etudiant.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__EtudiantClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    user<T extends UserDefaultArgs<ExtArgs> = {}>(args?: Subset<T, UserDefaultArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the Etudiant model
   */
  interface EtudiantFieldRefs {
    readonly id: FieldRef<"Etudiant", 'String'>
    readonly numeroInscription: FieldRef<"Etudiant", 'String'>
    readonly dateNaissance: FieldRef<"Etudiant", 'DateTime'>
    readonly lieuNaissance: FieldRef<"Etudiant", 'String'>
    readonly domaine: FieldRef<"Etudiant", 'String'>
    readonly filiere: FieldRef<"Etudiant", 'String'>
    readonly specialite: FieldRef<"Etudiant", 'String'>
    readonly diplomeType: FieldRef<"Etudiant", 'DiplomeType'>
    readonly anneeUniversitaireDebut: FieldRef<"Etudiant", 'String'>
    readonly progression: FieldRef<"Etudiant", 'EtudiantProgression'>
    readonly setupCompleted: FieldRef<"Etudiant", 'Boolean'>
  }
    

  // Custom InputTypes
  /**
   * Etudiant findUnique
   */
  export type EtudiantFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Etudiant
     */
    select?: EtudiantSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Etudiant
     */
    omit?: EtudiantOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: EtudiantInclude<ExtArgs> | null
    /**
     * Filter, which Etudiant to fetch.
     */
    where: EtudiantWhereUniqueInput
  }

  /**
   * Etudiant findUniqueOrThrow
   */
  export type EtudiantFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Etudiant
     */
    select?: EtudiantSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Etudiant
     */
    omit?: EtudiantOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: EtudiantInclude<ExtArgs> | null
    /**
     * Filter, which Etudiant to fetch.
     */
    where: EtudiantWhereUniqueInput
  }

  /**
   * Etudiant findFirst
   */
  export type EtudiantFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Etudiant
     */
    select?: EtudiantSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Etudiant
     */
    omit?: EtudiantOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: EtudiantInclude<ExtArgs> | null
    /**
     * Filter, which Etudiant to fetch.
     */
    where?: EtudiantWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Etudiants to fetch.
     */
    orderBy?: EtudiantOrderByWithRelationInput | EtudiantOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Etudiants.
     */
    cursor?: EtudiantWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Etudiants from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Etudiants.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Etudiants.
     */
    distinct?: EtudiantScalarFieldEnum | EtudiantScalarFieldEnum[]
  }

  /**
   * Etudiant findFirstOrThrow
   */
  export type EtudiantFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Etudiant
     */
    select?: EtudiantSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Etudiant
     */
    omit?: EtudiantOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: EtudiantInclude<ExtArgs> | null
    /**
     * Filter, which Etudiant to fetch.
     */
    where?: EtudiantWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Etudiants to fetch.
     */
    orderBy?: EtudiantOrderByWithRelationInput | EtudiantOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Etudiants.
     */
    cursor?: EtudiantWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Etudiants from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Etudiants.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Etudiants.
     */
    distinct?: EtudiantScalarFieldEnum | EtudiantScalarFieldEnum[]
  }

  /**
   * Etudiant findMany
   */
  export type EtudiantFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Etudiant
     */
    select?: EtudiantSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Etudiant
     */
    omit?: EtudiantOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: EtudiantInclude<ExtArgs> | null
    /**
     * Filter, which Etudiants to fetch.
     */
    where?: EtudiantWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Etudiants to fetch.
     */
    orderBy?: EtudiantOrderByWithRelationInput | EtudiantOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Etudiants.
     */
    cursor?: EtudiantWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Etudiants from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Etudiants.
     */
    skip?: number
    distinct?: EtudiantScalarFieldEnum | EtudiantScalarFieldEnum[]
  }

  /**
   * Etudiant create
   */
  export type EtudiantCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Etudiant
     */
    select?: EtudiantSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Etudiant
     */
    omit?: EtudiantOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: EtudiantInclude<ExtArgs> | null
    /**
     * The data needed to create a Etudiant.
     */
    data: XOR<EtudiantCreateInput, EtudiantUncheckedCreateInput>
  }

  /**
   * Etudiant createMany
   */
  export type EtudiantCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Etudiants.
     */
    data: EtudiantCreateManyInput | EtudiantCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Etudiant createManyAndReturn
   */
  export type EtudiantCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Etudiant
     */
    select?: EtudiantSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Etudiant
     */
    omit?: EtudiantOmit<ExtArgs> | null
    /**
     * The data used to create many Etudiants.
     */
    data: EtudiantCreateManyInput | EtudiantCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: EtudiantIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * Etudiant update
   */
  export type EtudiantUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Etudiant
     */
    select?: EtudiantSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Etudiant
     */
    omit?: EtudiantOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: EtudiantInclude<ExtArgs> | null
    /**
     * The data needed to update a Etudiant.
     */
    data: XOR<EtudiantUpdateInput, EtudiantUncheckedUpdateInput>
    /**
     * Choose, which Etudiant to update.
     */
    where: EtudiantWhereUniqueInput
  }

  /**
   * Etudiant updateMany
   */
  export type EtudiantUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Etudiants.
     */
    data: XOR<EtudiantUpdateManyMutationInput, EtudiantUncheckedUpdateManyInput>
    /**
     * Filter which Etudiants to update
     */
    where?: EtudiantWhereInput
    /**
     * Limit how many Etudiants to update.
     */
    limit?: number
  }

  /**
   * Etudiant updateManyAndReturn
   */
  export type EtudiantUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Etudiant
     */
    select?: EtudiantSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Etudiant
     */
    omit?: EtudiantOmit<ExtArgs> | null
    /**
     * The data used to update Etudiants.
     */
    data: XOR<EtudiantUpdateManyMutationInput, EtudiantUncheckedUpdateManyInput>
    /**
     * Filter which Etudiants to update
     */
    where?: EtudiantWhereInput
    /**
     * Limit how many Etudiants to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: EtudiantIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * Etudiant upsert
   */
  export type EtudiantUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Etudiant
     */
    select?: EtudiantSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Etudiant
     */
    omit?: EtudiantOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: EtudiantInclude<ExtArgs> | null
    /**
     * The filter to search for the Etudiant to update in case it exists.
     */
    where: EtudiantWhereUniqueInput
    /**
     * In case the Etudiant found by the `where` argument doesn't exist, create a new Etudiant with this data.
     */
    create: XOR<EtudiantCreateInput, EtudiantUncheckedCreateInput>
    /**
     * In case the Etudiant was found with the provided `where` argument, update it with this data.
     */
    update: XOR<EtudiantUpdateInput, EtudiantUncheckedUpdateInput>
  }

  /**
   * Etudiant delete
   */
  export type EtudiantDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Etudiant
     */
    select?: EtudiantSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Etudiant
     */
    omit?: EtudiantOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: EtudiantInclude<ExtArgs> | null
    /**
     * Filter which Etudiant to delete.
     */
    where: EtudiantWhereUniqueInput
  }

  /**
   * Etudiant deleteMany
   */
  export type EtudiantDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Etudiants to delete
     */
    where?: EtudiantWhereInput
    /**
     * Limit how many Etudiants to delete.
     */
    limit?: number
  }

  /**
   * Etudiant without action
   */
  export type EtudiantDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Etudiant
     */
    select?: EtudiantSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Etudiant
     */
    omit?: EtudiantOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: EtudiantInclude<ExtArgs> | null
  }


  /**
   * Enums
   */

  export const TransactionIsolationLevel: {
    ReadUncommitted: 'ReadUncommitted',
    ReadCommitted: 'ReadCommitted',
    RepeatableRead: 'RepeatableRead',
    Serializable: 'Serializable'
  };

  export type TransactionIsolationLevel = (typeof TransactionIsolationLevel)[keyof typeof TransactionIsolationLevel]


  export const UserScalarFieldEnum: {
    id: 'id',
    email: 'email',
    password: 'password',
    role: 'role',
    nom: 'nom',
    prenom: 'prenom',
    dateCreation: 'dateCreation',
    dateModification: 'dateModification'
  };

  export type UserScalarFieldEnum = (typeof UserScalarFieldEnum)[keyof typeof UserScalarFieldEnum]


  export const EtudiantScalarFieldEnum: {
    id: 'id',
    numeroInscription: 'numeroInscription',
    dateNaissance: 'dateNaissance',
    lieuNaissance: 'lieuNaissance',
    domaine: 'domaine',
    filiere: 'filiere',
    specialite: 'specialite',
    diplomeType: 'diplomeType',
    anneeUniversitaireDebut: 'anneeUniversitaireDebut',
    progression: 'progression',
    setupCompleted: 'setupCompleted'
  };

  export type EtudiantScalarFieldEnum = (typeof EtudiantScalarFieldEnum)[keyof typeof EtudiantScalarFieldEnum]


  export const SortOrder: {
    asc: 'asc',
    desc: 'desc'
  };

  export type SortOrder = (typeof SortOrder)[keyof typeof SortOrder]


  export const QueryMode: {
    default: 'default',
    insensitive: 'insensitive'
  };

  export type QueryMode = (typeof QueryMode)[keyof typeof QueryMode]


  export const NullsOrder: {
    first: 'first',
    last: 'last'
  };

  export type NullsOrder = (typeof NullsOrder)[keyof typeof NullsOrder]


  /**
   * Field references
   */


  /**
   * Reference to a field of type 'String'
   */
  export type StringFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'String'>
    


  /**
   * Reference to a field of type 'String[]'
   */
  export type ListStringFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'String[]'>
    


  /**
   * Reference to a field of type 'Role'
   */
  export type EnumRoleFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Role'>
    


  /**
   * Reference to a field of type 'Role[]'
   */
  export type ListEnumRoleFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Role[]'>
    


  /**
   * Reference to a field of type 'DateTime'
   */
  export type DateTimeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'DateTime'>
    


  /**
   * Reference to a field of type 'DateTime[]'
   */
  export type ListDateTimeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'DateTime[]'>
    


  /**
   * Reference to a field of type 'DiplomeType'
   */
  export type EnumDiplomeTypeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'DiplomeType'>
    


  /**
   * Reference to a field of type 'DiplomeType[]'
   */
  export type ListEnumDiplomeTypeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'DiplomeType[]'>
    


  /**
   * Reference to a field of type 'EtudiantProgression'
   */
  export type EnumEtudiantProgressionFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'EtudiantProgression'>
    


  /**
   * Reference to a field of type 'EtudiantProgression[]'
   */
  export type ListEnumEtudiantProgressionFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'EtudiantProgression[]'>
    


  /**
   * Reference to a field of type 'Boolean'
   */
  export type BooleanFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Boolean'>
    


  /**
   * Reference to a field of type 'Int'
   */
  export type IntFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Int'>
    


  /**
   * Reference to a field of type 'Int[]'
   */
  export type ListIntFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Int[]'>
    
  /**
   * Deep Input Types
   */


  export type UserWhereInput = {
    AND?: UserWhereInput | UserWhereInput[]
    OR?: UserWhereInput[]
    NOT?: UserWhereInput | UserWhereInput[]
    id?: StringFilter<"User"> | string
    email?: StringFilter<"User"> | string
    password?: StringFilter<"User"> | string
    role?: EnumRoleFilter<"User"> | $Enums.Role
    nom?: StringFilter<"User"> | string
    prenom?: StringFilter<"User"> | string
    dateCreation?: DateTimeFilter<"User"> | Date | string
    dateModification?: DateTimeFilter<"User"> | Date | string
    etudiant?: XOR<EtudiantNullableScalarRelationFilter, EtudiantWhereInput> | null
  }

  export type UserOrderByWithRelationInput = {
    id?: SortOrder
    email?: SortOrder
    password?: SortOrder
    role?: SortOrder
    nom?: SortOrder
    prenom?: SortOrder
    dateCreation?: SortOrder
    dateModification?: SortOrder
    etudiant?: EtudiantOrderByWithRelationInput
  }

  export type UserWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    email?: string
    AND?: UserWhereInput | UserWhereInput[]
    OR?: UserWhereInput[]
    NOT?: UserWhereInput | UserWhereInput[]
    password?: StringFilter<"User"> | string
    role?: EnumRoleFilter<"User"> | $Enums.Role
    nom?: StringFilter<"User"> | string
    prenom?: StringFilter<"User"> | string
    dateCreation?: DateTimeFilter<"User"> | Date | string
    dateModification?: DateTimeFilter<"User"> | Date | string
    etudiant?: XOR<EtudiantNullableScalarRelationFilter, EtudiantWhereInput> | null
  }, "id" | "email">

  export type UserOrderByWithAggregationInput = {
    id?: SortOrder
    email?: SortOrder
    password?: SortOrder
    role?: SortOrder
    nom?: SortOrder
    prenom?: SortOrder
    dateCreation?: SortOrder
    dateModification?: SortOrder
    _count?: UserCountOrderByAggregateInput
    _max?: UserMaxOrderByAggregateInput
    _min?: UserMinOrderByAggregateInput
  }

  export type UserScalarWhereWithAggregatesInput = {
    AND?: UserScalarWhereWithAggregatesInput | UserScalarWhereWithAggregatesInput[]
    OR?: UserScalarWhereWithAggregatesInput[]
    NOT?: UserScalarWhereWithAggregatesInput | UserScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"User"> | string
    email?: StringWithAggregatesFilter<"User"> | string
    password?: StringWithAggregatesFilter<"User"> | string
    role?: EnumRoleWithAggregatesFilter<"User"> | $Enums.Role
    nom?: StringWithAggregatesFilter<"User"> | string
    prenom?: StringWithAggregatesFilter<"User"> | string
    dateCreation?: DateTimeWithAggregatesFilter<"User"> | Date | string
    dateModification?: DateTimeWithAggregatesFilter<"User"> | Date | string
  }

  export type EtudiantWhereInput = {
    AND?: EtudiantWhereInput | EtudiantWhereInput[]
    OR?: EtudiantWhereInput[]
    NOT?: EtudiantWhereInput | EtudiantWhereInput[]
    id?: StringFilter<"Etudiant"> | string
    numeroInscription?: StringFilter<"Etudiant"> | string
    dateNaissance?: DateTimeNullableFilter<"Etudiant"> | Date | string | null
    lieuNaissance?: StringNullableFilter<"Etudiant"> | string | null
    domaine?: StringNullableFilter<"Etudiant"> | string | null
    filiere?: StringNullableFilter<"Etudiant"> | string | null
    specialite?: StringNullableFilter<"Etudiant"> | string | null
    diplomeType?: EnumDiplomeTypeNullableFilter<"Etudiant"> | $Enums.DiplomeType | null
    anneeUniversitaireDebut?: StringNullableFilter<"Etudiant"> | string | null
    progression?: EnumEtudiantProgressionFilter<"Etudiant"> | $Enums.EtudiantProgression
    setupCompleted?: BoolFilter<"Etudiant"> | boolean
    user?: XOR<UserScalarRelationFilter, UserWhereInput>
  }

  export type EtudiantOrderByWithRelationInput = {
    id?: SortOrder
    numeroInscription?: SortOrder
    dateNaissance?: SortOrderInput | SortOrder
    lieuNaissance?: SortOrderInput | SortOrder
    domaine?: SortOrderInput | SortOrder
    filiere?: SortOrderInput | SortOrder
    specialite?: SortOrderInput | SortOrder
    diplomeType?: SortOrderInput | SortOrder
    anneeUniversitaireDebut?: SortOrderInput | SortOrder
    progression?: SortOrder
    setupCompleted?: SortOrder
    user?: UserOrderByWithRelationInput
  }

  export type EtudiantWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    numeroInscription?: string
    AND?: EtudiantWhereInput | EtudiantWhereInput[]
    OR?: EtudiantWhereInput[]
    NOT?: EtudiantWhereInput | EtudiantWhereInput[]
    dateNaissance?: DateTimeNullableFilter<"Etudiant"> | Date | string | null
    lieuNaissance?: StringNullableFilter<"Etudiant"> | string | null
    domaine?: StringNullableFilter<"Etudiant"> | string | null
    filiere?: StringNullableFilter<"Etudiant"> | string | null
    specialite?: StringNullableFilter<"Etudiant"> | string | null
    diplomeType?: EnumDiplomeTypeNullableFilter<"Etudiant"> | $Enums.DiplomeType | null
    anneeUniversitaireDebut?: StringNullableFilter<"Etudiant"> | string | null
    progression?: EnumEtudiantProgressionFilter<"Etudiant"> | $Enums.EtudiantProgression
    setupCompleted?: BoolFilter<"Etudiant"> | boolean
    user?: XOR<UserScalarRelationFilter, UserWhereInput>
  }, "id" | "numeroInscription">

  export type EtudiantOrderByWithAggregationInput = {
    id?: SortOrder
    numeroInscription?: SortOrder
    dateNaissance?: SortOrderInput | SortOrder
    lieuNaissance?: SortOrderInput | SortOrder
    domaine?: SortOrderInput | SortOrder
    filiere?: SortOrderInput | SortOrder
    specialite?: SortOrderInput | SortOrder
    diplomeType?: SortOrderInput | SortOrder
    anneeUniversitaireDebut?: SortOrderInput | SortOrder
    progression?: SortOrder
    setupCompleted?: SortOrder
    _count?: EtudiantCountOrderByAggregateInput
    _max?: EtudiantMaxOrderByAggregateInput
    _min?: EtudiantMinOrderByAggregateInput
  }

  export type EtudiantScalarWhereWithAggregatesInput = {
    AND?: EtudiantScalarWhereWithAggregatesInput | EtudiantScalarWhereWithAggregatesInput[]
    OR?: EtudiantScalarWhereWithAggregatesInput[]
    NOT?: EtudiantScalarWhereWithAggregatesInput | EtudiantScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"Etudiant"> | string
    numeroInscription?: StringWithAggregatesFilter<"Etudiant"> | string
    dateNaissance?: DateTimeNullableWithAggregatesFilter<"Etudiant"> | Date | string | null
    lieuNaissance?: StringNullableWithAggregatesFilter<"Etudiant"> | string | null
    domaine?: StringNullableWithAggregatesFilter<"Etudiant"> | string | null
    filiere?: StringNullableWithAggregatesFilter<"Etudiant"> | string | null
    specialite?: StringNullableWithAggregatesFilter<"Etudiant"> | string | null
    diplomeType?: EnumDiplomeTypeNullableWithAggregatesFilter<"Etudiant"> | $Enums.DiplomeType | null
    anneeUniversitaireDebut?: StringNullableWithAggregatesFilter<"Etudiant"> | string | null
    progression?: EnumEtudiantProgressionWithAggregatesFilter<"Etudiant"> | $Enums.EtudiantProgression
    setupCompleted?: BoolWithAggregatesFilter<"Etudiant"> | boolean
  }

  export type UserCreateInput = {
    id?: string
    email: string
    password: string
    role: $Enums.Role
    nom: string
    prenom: string
    dateCreation?: Date | string
    dateModification?: Date | string
    etudiant?: EtudiantCreateNestedOneWithoutUserInput
  }

  export type UserUncheckedCreateInput = {
    id?: string
    email: string
    password: string
    role: $Enums.Role
    nom: string
    prenom: string
    dateCreation?: Date | string
    dateModification?: Date | string
    etudiant?: EtudiantUncheckedCreateNestedOneWithoutUserInput
  }

  export type UserUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    role?: EnumRoleFieldUpdateOperationsInput | $Enums.Role
    nom?: StringFieldUpdateOperationsInput | string
    prenom?: StringFieldUpdateOperationsInput | string
    dateCreation?: DateTimeFieldUpdateOperationsInput | Date | string
    dateModification?: DateTimeFieldUpdateOperationsInput | Date | string
    etudiant?: EtudiantUpdateOneWithoutUserNestedInput
  }

  export type UserUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    role?: EnumRoleFieldUpdateOperationsInput | $Enums.Role
    nom?: StringFieldUpdateOperationsInput | string
    prenom?: StringFieldUpdateOperationsInput | string
    dateCreation?: DateTimeFieldUpdateOperationsInput | Date | string
    dateModification?: DateTimeFieldUpdateOperationsInput | Date | string
    etudiant?: EtudiantUncheckedUpdateOneWithoutUserNestedInput
  }

  export type UserCreateManyInput = {
    id?: string
    email: string
    password: string
    role: $Enums.Role
    nom: string
    prenom: string
    dateCreation?: Date | string
    dateModification?: Date | string
  }

  export type UserUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    role?: EnumRoleFieldUpdateOperationsInput | $Enums.Role
    nom?: StringFieldUpdateOperationsInput | string
    prenom?: StringFieldUpdateOperationsInput | string
    dateCreation?: DateTimeFieldUpdateOperationsInput | Date | string
    dateModification?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type UserUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    role?: EnumRoleFieldUpdateOperationsInput | $Enums.Role
    nom?: StringFieldUpdateOperationsInput | string
    prenom?: StringFieldUpdateOperationsInput | string
    dateCreation?: DateTimeFieldUpdateOperationsInput | Date | string
    dateModification?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type EtudiantCreateInput = {
    numeroInscription: string
    dateNaissance?: Date | string | null
    lieuNaissance?: string | null
    domaine?: string | null
    filiere?: string | null
    specialite?: string | null
    diplomeType?: $Enums.DiplomeType | null
    anneeUniversitaireDebut?: string | null
    progression?: $Enums.EtudiantProgression
    setupCompleted?: boolean
    user: UserCreateNestedOneWithoutEtudiantInput
  }

  export type EtudiantUncheckedCreateInput = {
    id: string
    numeroInscription: string
    dateNaissance?: Date | string | null
    lieuNaissance?: string | null
    domaine?: string | null
    filiere?: string | null
    specialite?: string | null
    diplomeType?: $Enums.DiplomeType | null
    anneeUniversitaireDebut?: string | null
    progression?: $Enums.EtudiantProgression
    setupCompleted?: boolean
  }

  export type EtudiantUpdateInput = {
    numeroInscription?: StringFieldUpdateOperationsInput | string
    dateNaissance?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    lieuNaissance?: NullableStringFieldUpdateOperationsInput | string | null
    domaine?: NullableStringFieldUpdateOperationsInput | string | null
    filiere?: NullableStringFieldUpdateOperationsInput | string | null
    specialite?: NullableStringFieldUpdateOperationsInput | string | null
    diplomeType?: NullableEnumDiplomeTypeFieldUpdateOperationsInput | $Enums.DiplomeType | null
    anneeUniversitaireDebut?: NullableStringFieldUpdateOperationsInput | string | null
    progression?: EnumEtudiantProgressionFieldUpdateOperationsInput | $Enums.EtudiantProgression
    setupCompleted?: BoolFieldUpdateOperationsInput | boolean
    user?: UserUpdateOneRequiredWithoutEtudiantNestedInput
  }

  export type EtudiantUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    numeroInscription?: StringFieldUpdateOperationsInput | string
    dateNaissance?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    lieuNaissance?: NullableStringFieldUpdateOperationsInput | string | null
    domaine?: NullableStringFieldUpdateOperationsInput | string | null
    filiere?: NullableStringFieldUpdateOperationsInput | string | null
    specialite?: NullableStringFieldUpdateOperationsInput | string | null
    diplomeType?: NullableEnumDiplomeTypeFieldUpdateOperationsInput | $Enums.DiplomeType | null
    anneeUniversitaireDebut?: NullableStringFieldUpdateOperationsInput | string | null
    progression?: EnumEtudiantProgressionFieldUpdateOperationsInput | $Enums.EtudiantProgression
    setupCompleted?: BoolFieldUpdateOperationsInput | boolean
  }

  export type EtudiantCreateManyInput = {
    id: string
    numeroInscription: string
    dateNaissance?: Date | string | null
    lieuNaissance?: string | null
    domaine?: string | null
    filiere?: string | null
    specialite?: string | null
    diplomeType?: $Enums.DiplomeType | null
    anneeUniversitaireDebut?: string | null
    progression?: $Enums.EtudiantProgression
    setupCompleted?: boolean
  }

  export type EtudiantUpdateManyMutationInput = {
    numeroInscription?: StringFieldUpdateOperationsInput | string
    dateNaissance?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    lieuNaissance?: NullableStringFieldUpdateOperationsInput | string | null
    domaine?: NullableStringFieldUpdateOperationsInput | string | null
    filiere?: NullableStringFieldUpdateOperationsInput | string | null
    specialite?: NullableStringFieldUpdateOperationsInput | string | null
    diplomeType?: NullableEnumDiplomeTypeFieldUpdateOperationsInput | $Enums.DiplomeType | null
    anneeUniversitaireDebut?: NullableStringFieldUpdateOperationsInput | string | null
    progression?: EnumEtudiantProgressionFieldUpdateOperationsInput | $Enums.EtudiantProgression
    setupCompleted?: BoolFieldUpdateOperationsInput | boolean
  }

  export type EtudiantUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    numeroInscription?: StringFieldUpdateOperationsInput | string
    dateNaissance?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    lieuNaissance?: NullableStringFieldUpdateOperationsInput | string | null
    domaine?: NullableStringFieldUpdateOperationsInput | string | null
    filiere?: NullableStringFieldUpdateOperationsInput | string | null
    specialite?: NullableStringFieldUpdateOperationsInput | string | null
    diplomeType?: NullableEnumDiplomeTypeFieldUpdateOperationsInput | $Enums.DiplomeType | null
    anneeUniversitaireDebut?: NullableStringFieldUpdateOperationsInput | string | null
    progression?: EnumEtudiantProgressionFieldUpdateOperationsInput | $Enums.EtudiantProgression
    setupCompleted?: BoolFieldUpdateOperationsInput | boolean
  }

  export type StringFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringFilter<$PrismaModel> | string
  }

  export type EnumRoleFilter<$PrismaModel = never> = {
    equals?: $Enums.Role | EnumRoleFieldRefInput<$PrismaModel>
    in?: $Enums.Role[] | ListEnumRoleFieldRefInput<$PrismaModel>
    notIn?: $Enums.Role[] | ListEnumRoleFieldRefInput<$PrismaModel>
    not?: NestedEnumRoleFilter<$PrismaModel> | $Enums.Role
  }

  export type DateTimeFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeFilter<$PrismaModel> | Date | string
  }

  export type EtudiantNullableScalarRelationFilter = {
    is?: EtudiantWhereInput | null
    isNot?: EtudiantWhereInput | null
  }

  export type UserCountOrderByAggregateInput = {
    id?: SortOrder
    email?: SortOrder
    password?: SortOrder
    role?: SortOrder
    nom?: SortOrder
    prenom?: SortOrder
    dateCreation?: SortOrder
    dateModification?: SortOrder
  }

  export type UserMaxOrderByAggregateInput = {
    id?: SortOrder
    email?: SortOrder
    password?: SortOrder
    role?: SortOrder
    nom?: SortOrder
    prenom?: SortOrder
    dateCreation?: SortOrder
    dateModification?: SortOrder
  }

  export type UserMinOrderByAggregateInput = {
    id?: SortOrder
    email?: SortOrder
    password?: SortOrder
    role?: SortOrder
    nom?: SortOrder
    prenom?: SortOrder
    dateCreation?: SortOrder
    dateModification?: SortOrder
  }

  export type StringWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringWithAggregatesFilter<$PrismaModel> | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedStringFilter<$PrismaModel>
    _max?: NestedStringFilter<$PrismaModel>
  }

  export type EnumRoleWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.Role | EnumRoleFieldRefInput<$PrismaModel>
    in?: $Enums.Role[] | ListEnumRoleFieldRefInput<$PrismaModel>
    notIn?: $Enums.Role[] | ListEnumRoleFieldRefInput<$PrismaModel>
    not?: NestedEnumRoleWithAggregatesFilter<$PrismaModel> | $Enums.Role
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumRoleFilter<$PrismaModel>
    _max?: NestedEnumRoleFilter<$PrismaModel>
  }

  export type DateTimeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeWithAggregatesFilter<$PrismaModel> | Date | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedDateTimeFilter<$PrismaModel>
    _max?: NestedDateTimeFilter<$PrismaModel>
  }

  export type DateTimeNullableFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel> | null
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeNullableFilter<$PrismaModel> | Date | string | null
  }

  export type StringNullableFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringNullableFilter<$PrismaModel> | string | null
  }

  export type EnumDiplomeTypeNullableFilter<$PrismaModel = never> = {
    equals?: $Enums.DiplomeType | EnumDiplomeTypeFieldRefInput<$PrismaModel> | null
    in?: $Enums.DiplomeType[] | ListEnumDiplomeTypeFieldRefInput<$PrismaModel> | null
    notIn?: $Enums.DiplomeType[] | ListEnumDiplomeTypeFieldRefInput<$PrismaModel> | null
    not?: NestedEnumDiplomeTypeNullableFilter<$PrismaModel> | $Enums.DiplomeType | null
  }

  export type EnumEtudiantProgressionFilter<$PrismaModel = never> = {
    equals?: $Enums.EtudiantProgression | EnumEtudiantProgressionFieldRefInput<$PrismaModel>
    in?: $Enums.EtudiantProgression[] | ListEnumEtudiantProgressionFieldRefInput<$PrismaModel>
    notIn?: $Enums.EtudiantProgression[] | ListEnumEtudiantProgressionFieldRefInput<$PrismaModel>
    not?: NestedEnumEtudiantProgressionFilter<$PrismaModel> | $Enums.EtudiantProgression
  }

  export type BoolFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolFilter<$PrismaModel> | boolean
  }

  export type UserScalarRelationFilter = {
    is?: UserWhereInput
    isNot?: UserWhereInput
  }

  export type SortOrderInput = {
    sort: SortOrder
    nulls?: NullsOrder
  }

  export type EtudiantCountOrderByAggregateInput = {
    id?: SortOrder
    numeroInscription?: SortOrder
    dateNaissance?: SortOrder
    lieuNaissance?: SortOrder
    domaine?: SortOrder
    filiere?: SortOrder
    specialite?: SortOrder
    diplomeType?: SortOrder
    anneeUniversitaireDebut?: SortOrder
    progression?: SortOrder
    setupCompleted?: SortOrder
  }

  export type EtudiantMaxOrderByAggregateInput = {
    id?: SortOrder
    numeroInscription?: SortOrder
    dateNaissance?: SortOrder
    lieuNaissance?: SortOrder
    domaine?: SortOrder
    filiere?: SortOrder
    specialite?: SortOrder
    diplomeType?: SortOrder
    anneeUniversitaireDebut?: SortOrder
    progression?: SortOrder
    setupCompleted?: SortOrder
  }

  export type EtudiantMinOrderByAggregateInput = {
    id?: SortOrder
    numeroInscription?: SortOrder
    dateNaissance?: SortOrder
    lieuNaissance?: SortOrder
    domaine?: SortOrder
    filiere?: SortOrder
    specialite?: SortOrder
    diplomeType?: SortOrder
    anneeUniversitaireDebut?: SortOrder
    progression?: SortOrder
    setupCompleted?: SortOrder
  }

  export type DateTimeNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel> | null
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeNullableWithAggregatesFilter<$PrismaModel> | Date | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedDateTimeNullableFilter<$PrismaModel>
    _max?: NestedDateTimeNullableFilter<$PrismaModel>
  }

  export type StringNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringNullableWithAggregatesFilter<$PrismaModel> | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedStringNullableFilter<$PrismaModel>
    _max?: NestedStringNullableFilter<$PrismaModel>
  }

  export type EnumDiplomeTypeNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.DiplomeType | EnumDiplomeTypeFieldRefInput<$PrismaModel> | null
    in?: $Enums.DiplomeType[] | ListEnumDiplomeTypeFieldRefInput<$PrismaModel> | null
    notIn?: $Enums.DiplomeType[] | ListEnumDiplomeTypeFieldRefInput<$PrismaModel> | null
    not?: NestedEnumDiplomeTypeNullableWithAggregatesFilter<$PrismaModel> | $Enums.DiplomeType | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedEnumDiplomeTypeNullableFilter<$PrismaModel>
    _max?: NestedEnumDiplomeTypeNullableFilter<$PrismaModel>
  }

  export type EnumEtudiantProgressionWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.EtudiantProgression | EnumEtudiantProgressionFieldRefInput<$PrismaModel>
    in?: $Enums.EtudiantProgression[] | ListEnumEtudiantProgressionFieldRefInput<$PrismaModel>
    notIn?: $Enums.EtudiantProgression[] | ListEnumEtudiantProgressionFieldRefInput<$PrismaModel>
    not?: NestedEnumEtudiantProgressionWithAggregatesFilter<$PrismaModel> | $Enums.EtudiantProgression
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumEtudiantProgressionFilter<$PrismaModel>
    _max?: NestedEnumEtudiantProgressionFilter<$PrismaModel>
  }

  export type BoolWithAggregatesFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolWithAggregatesFilter<$PrismaModel> | boolean
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedBoolFilter<$PrismaModel>
    _max?: NestedBoolFilter<$PrismaModel>
  }

  export type EtudiantCreateNestedOneWithoutUserInput = {
    create?: XOR<EtudiantCreateWithoutUserInput, EtudiantUncheckedCreateWithoutUserInput>
    connectOrCreate?: EtudiantCreateOrConnectWithoutUserInput
    connect?: EtudiantWhereUniqueInput
  }

  export type EtudiantUncheckedCreateNestedOneWithoutUserInput = {
    create?: XOR<EtudiantCreateWithoutUserInput, EtudiantUncheckedCreateWithoutUserInput>
    connectOrCreate?: EtudiantCreateOrConnectWithoutUserInput
    connect?: EtudiantWhereUniqueInput
  }

  export type StringFieldUpdateOperationsInput = {
    set?: string
  }

  export type EnumRoleFieldUpdateOperationsInput = {
    set?: $Enums.Role
  }

  export type DateTimeFieldUpdateOperationsInput = {
    set?: Date | string
  }

  export type EtudiantUpdateOneWithoutUserNestedInput = {
    create?: XOR<EtudiantCreateWithoutUserInput, EtudiantUncheckedCreateWithoutUserInput>
    connectOrCreate?: EtudiantCreateOrConnectWithoutUserInput
    upsert?: EtudiantUpsertWithoutUserInput
    disconnect?: EtudiantWhereInput | boolean
    delete?: EtudiantWhereInput | boolean
    connect?: EtudiantWhereUniqueInput
    update?: XOR<XOR<EtudiantUpdateToOneWithWhereWithoutUserInput, EtudiantUpdateWithoutUserInput>, EtudiantUncheckedUpdateWithoutUserInput>
  }

  export type EtudiantUncheckedUpdateOneWithoutUserNestedInput = {
    create?: XOR<EtudiantCreateWithoutUserInput, EtudiantUncheckedCreateWithoutUserInput>
    connectOrCreate?: EtudiantCreateOrConnectWithoutUserInput
    upsert?: EtudiantUpsertWithoutUserInput
    disconnect?: EtudiantWhereInput | boolean
    delete?: EtudiantWhereInput | boolean
    connect?: EtudiantWhereUniqueInput
    update?: XOR<XOR<EtudiantUpdateToOneWithWhereWithoutUserInput, EtudiantUpdateWithoutUserInput>, EtudiantUncheckedUpdateWithoutUserInput>
  }

  export type UserCreateNestedOneWithoutEtudiantInput = {
    create?: XOR<UserCreateWithoutEtudiantInput, UserUncheckedCreateWithoutEtudiantInput>
    connectOrCreate?: UserCreateOrConnectWithoutEtudiantInput
    connect?: UserWhereUniqueInput
  }

  export type NullableDateTimeFieldUpdateOperationsInput = {
    set?: Date | string | null
  }

  export type NullableStringFieldUpdateOperationsInput = {
    set?: string | null
  }

  export type NullableEnumDiplomeTypeFieldUpdateOperationsInput = {
    set?: $Enums.DiplomeType | null
  }

  export type EnumEtudiantProgressionFieldUpdateOperationsInput = {
    set?: $Enums.EtudiantProgression
  }

  export type BoolFieldUpdateOperationsInput = {
    set?: boolean
  }

  export type UserUpdateOneRequiredWithoutEtudiantNestedInput = {
    create?: XOR<UserCreateWithoutEtudiantInput, UserUncheckedCreateWithoutEtudiantInput>
    connectOrCreate?: UserCreateOrConnectWithoutEtudiantInput
    upsert?: UserUpsertWithoutEtudiantInput
    connect?: UserWhereUniqueInput
    update?: XOR<XOR<UserUpdateToOneWithWhereWithoutEtudiantInput, UserUpdateWithoutEtudiantInput>, UserUncheckedUpdateWithoutEtudiantInput>
  }

  export type NestedStringFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringFilter<$PrismaModel> | string
  }

  export type NestedEnumRoleFilter<$PrismaModel = never> = {
    equals?: $Enums.Role | EnumRoleFieldRefInput<$PrismaModel>
    in?: $Enums.Role[] | ListEnumRoleFieldRefInput<$PrismaModel>
    notIn?: $Enums.Role[] | ListEnumRoleFieldRefInput<$PrismaModel>
    not?: NestedEnumRoleFilter<$PrismaModel> | $Enums.Role
  }

  export type NestedDateTimeFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeFilter<$PrismaModel> | Date | string
  }

  export type NestedStringWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringWithAggregatesFilter<$PrismaModel> | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedStringFilter<$PrismaModel>
    _max?: NestedStringFilter<$PrismaModel>
  }

  export type NestedIntFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[] | ListIntFieldRefInput<$PrismaModel>
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntFilter<$PrismaModel> | number
  }

  export type NestedEnumRoleWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.Role | EnumRoleFieldRefInput<$PrismaModel>
    in?: $Enums.Role[] | ListEnumRoleFieldRefInput<$PrismaModel>
    notIn?: $Enums.Role[] | ListEnumRoleFieldRefInput<$PrismaModel>
    not?: NestedEnumRoleWithAggregatesFilter<$PrismaModel> | $Enums.Role
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumRoleFilter<$PrismaModel>
    _max?: NestedEnumRoleFilter<$PrismaModel>
  }

  export type NestedDateTimeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeWithAggregatesFilter<$PrismaModel> | Date | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedDateTimeFilter<$PrismaModel>
    _max?: NestedDateTimeFilter<$PrismaModel>
  }

  export type NestedDateTimeNullableFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel> | null
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeNullableFilter<$PrismaModel> | Date | string | null
  }

  export type NestedStringNullableFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringNullableFilter<$PrismaModel> | string | null
  }

  export type NestedEnumDiplomeTypeNullableFilter<$PrismaModel = never> = {
    equals?: $Enums.DiplomeType | EnumDiplomeTypeFieldRefInput<$PrismaModel> | null
    in?: $Enums.DiplomeType[] | ListEnumDiplomeTypeFieldRefInput<$PrismaModel> | null
    notIn?: $Enums.DiplomeType[] | ListEnumDiplomeTypeFieldRefInput<$PrismaModel> | null
    not?: NestedEnumDiplomeTypeNullableFilter<$PrismaModel> | $Enums.DiplomeType | null
  }

  export type NestedEnumEtudiantProgressionFilter<$PrismaModel = never> = {
    equals?: $Enums.EtudiantProgression | EnumEtudiantProgressionFieldRefInput<$PrismaModel>
    in?: $Enums.EtudiantProgression[] | ListEnumEtudiantProgressionFieldRefInput<$PrismaModel>
    notIn?: $Enums.EtudiantProgression[] | ListEnumEtudiantProgressionFieldRefInput<$PrismaModel>
    not?: NestedEnumEtudiantProgressionFilter<$PrismaModel> | $Enums.EtudiantProgression
  }

  export type NestedBoolFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolFilter<$PrismaModel> | boolean
  }

  export type NestedDateTimeNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel> | null
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeNullableWithAggregatesFilter<$PrismaModel> | Date | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedDateTimeNullableFilter<$PrismaModel>
    _max?: NestedDateTimeNullableFilter<$PrismaModel>
  }

  export type NestedIntNullableFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel> | null
    in?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntNullableFilter<$PrismaModel> | number | null
  }

  export type NestedStringNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringNullableWithAggregatesFilter<$PrismaModel> | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedStringNullableFilter<$PrismaModel>
    _max?: NestedStringNullableFilter<$PrismaModel>
  }

  export type NestedEnumDiplomeTypeNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.DiplomeType | EnumDiplomeTypeFieldRefInput<$PrismaModel> | null
    in?: $Enums.DiplomeType[] | ListEnumDiplomeTypeFieldRefInput<$PrismaModel> | null
    notIn?: $Enums.DiplomeType[] | ListEnumDiplomeTypeFieldRefInput<$PrismaModel> | null
    not?: NestedEnumDiplomeTypeNullableWithAggregatesFilter<$PrismaModel> | $Enums.DiplomeType | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedEnumDiplomeTypeNullableFilter<$PrismaModel>
    _max?: NestedEnumDiplomeTypeNullableFilter<$PrismaModel>
  }

  export type NestedEnumEtudiantProgressionWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.EtudiantProgression | EnumEtudiantProgressionFieldRefInput<$PrismaModel>
    in?: $Enums.EtudiantProgression[] | ListEnumEtudiantProgressionFieldRefInput<$PrismaModel>
    notIn?: $Enums.EtudiantProgression[] | ListEnumEtudiantProgressionFieldRefInput<$PrismaModel>
    not?: NestedEnumEtudiantProgressionWithAggregatesFilter<$PrismaModel> | $Enums.EtudiantProgression
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumEtudiantProgressionFilter<$PrismaModel>
    _max?: NestedEnumEtudiantProgressionFilter<$PrismaModel>
  }

  export type NestedBoolWithAggregatesFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolWithAggregatesFilter<$PrismaModel> | boolean
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedBoolFilter<$PrismaModel>
    _max?: NestedBoolFilter<$PrismaModel>
  }

  export type EtudiantCreateWithoutUserInput = {
    numeroInscription: string
    dateNaissance?: Date | string | null
    lieuNaissance?: string | null
    domaine?: string | null
    filiere?: string | null
    specialite?: string | null
    diplomeType?: $Enums.DiplomeType | null
    anneeUniversitaireDebut?: string | null
    progression?: $Enums.EtudiantProgression
    setupCompleted?: boolean
  }

  export type EtudiantUncheckedCreateWithoutUserInput = {
    numeroInscription: string
    dateNaissance?: Date | string | null
    lieuNaissance?: string | null
    domaine?: string | null
    filiere?: string | null
    specialite?: string | null
    diplomeType?: $Enums.DiplomeType | null
    anneeUniversitaireDebut?: string | null
    progression?: $Enums.EtudiantProgression
    setupCompleted?: boolean
  }

  export type EtudiantCreateOrConnectWithoutUserInput = {
    where: EtudiantWhereUniqueInput
    create: XOR<EtudiantCreateWithoutUserInput, EtudiantUncheckedCreateWithoutUserInput>
  }

  export type EtudiantUpsertWithoutUserInput = {
    update: XOR<EtudiantUpdateWithoutUserInput, EtudiantUncheckedUpdateWithoutUserInput>
    create: XOR<EtudiantCreateWithoutUserInput, EtudiantUncheckedCreateWithoutUserInput>
    where?: EtudiantWhereInput
  }

  export type EtudiantUpdateToOneWithWhereWithoutUserInput = {
    where?: EtudiantWhereInput
    data: XOR<EtudiantUpdateWithoutUserInput, EtudiantUncheckedUpdateWithoutUserInput>
  }

  export type EtudiantUpdateWithoutUserInput = {
    numeroInscription?: StringFieldUpdateOperationsInput | string
    dateNaissance?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    lieuNaissance?: NullableStringFieldUpdateOperationsInput | string | null
    domaine?: NullableStringFieldUpdateOperationsInput | string | null
    filiere?: NullableStringFieldUpdateOperationsInput | string | null
    specialite?: NullableStringFieldUpdateOperationsInput | string | null
    diplomeType?: NullableEnumDiplomeTypeFieldUpdateOperationsInput | $Enums.DiplomeType | null
    anneeUniversitaireDebut?: NullableStringFieldUpdateOperationsInput | string | null
    progression?: EnumEtudiantProgressionFieldUpdateOperationsInput | $Enums.EtudiantProgression
    setupCompleted?: BoolFieldUpdateOperationsInput | boolean
  }

  export type EtudiantUncheckedUpdateWithoutUserInput = {
    numeroInscription?: StringFieldUpdateOperationsInput | string
    dateNaissance?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    lieuNaissance?: NullableStringFieldUpdateOperationsInput | string | null
    domaine?: NullableStringFieldUpdateOperationsInput | string | null
    filiere?: NullableStringFieldUpdateOperationsInput | string | null
    specialite?: NullableStringFieldUpdateOperationsInput | string | null
    diplomeType?: NullableEnumDiplomeTypeFieldUpdateOperationsInput | $Enums.DiplomeType | null
    anneeUniversitaireDebut?: NullableStringFieldUpdateOperationsInput | string | null
    progression?: EnumEtudiantProgressionFieldUpdateOperationsInput | $Enums.EtudiantProgression
    setupCompleted?: BoolFieldUpdateOperationsInput | boolean
  }

  export type UserCreateWithoutEtudiantInput = {
    id?: string
    email: string
    password: string
    role: $Enums.Role
    nom: string
    prenom: string
    dateCreation?: Date | string
    dateModification?: Date | string
  }

  export type UserUncheckedCreateWithoutEtudiantInput = {
    id?: string
    email: string
    password: string
    role: $Enums.Role
    nom: string
    prenom: string
    dateCreation?: Date | string
    dateModification?: Date | string
  }

  export type UserCreateOrConnectWithoutEtudiantInput = {
    where: UserWhereUniqueInput
    create: XOR<UserCreateWithoutEtudiantInput, UserUncheckedCreateWithoutEtudiantInput>
  }

  export type UserUpsertWithoutEtudiantInput = {
    update: XOR<UserUpdateWithoutEtudiantInput, UserUncheckedUpdateWithoutEtudiantInput>
    create: XOR<UserCreateWithoutEtudiantInput, UserUncheckedCreateWithoutEtudiantInput>
    where?: UserWhereInput
  }

  export type UserUpdateToOneWithWhereWithoutEtudiantInput = {
    where?: UserWhereInput
    data: XOR<UserUpdateWithoutEtudiantInput, UserUncheckedUpdateWithoutEtudiantInput>
  }

  export type UserUpdateWithoutEtudiantInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    role?: EnumRoleFieldUpdateOperationsInput | $Enums.Role
    nom?: StringFieldUpdateOperationsInput | string
    prenom?: StringFieldUpdateOperationsInput | string
    dateCreation?: DateTimeFieldUpdateOperationsInput | Date | string
    dateModification?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type UserUncheckedUpdateWithoutEtudiantInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    role?: EnumRoleFieldUpdateOperationsInput | $Enums.Role
    nom?: StringFieldUpdateOperationsInput | string
    prenom?: StringFieldUpdateOperationsInput | string
    dateCreation?: DateTimeFieldUpdateOperationsInput | Date | string
    dateModification?: DateTimeFieldUpdateOperationsInput | Date | string
  }



  /**
   * Batch Payload for updateMany & deleteMany & createMany
   */

  export type BatchPayload = {
    count: number
  }

  /**
   * DMMF
   */
  export const dmmf: runtime.BaseDMMF
}