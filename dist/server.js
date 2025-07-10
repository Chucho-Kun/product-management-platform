"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.connectDB = connectDB;
const express_1 = __importDefault(require("express"));
const router_1 = __importDefault(require("./router"));
const db_1 = __importDefault(require("./config/db"));
const colors_1 = __importDefault(require("colors"));
const cors_1 = __importDefault(require("cors"));
const swagger_ui_express_1 = __importDefault(require("swagger-ui-express"));
const swagger_1 = __importStar(require("./config/swagger"));
const morgan_1 = __importDefault(require("morgan"));
// conexion a DB
async function connectDB() {
    try {
        await db_1.default.authenticate();
        db_1.default.sync();
        //console.log(colors.yellow.bold('Conexion exitosa a la DB'))
    }
    catch (error) {
        console.log(colors_1.default.red.bold('Error en la conexión a la base de datos'));
    }
}
connectDB();
// instancia de express
const server = (0, express_1.default)();
// permitir conexiones CORS
const corsOptions = {
    origin: function (origin, callback) {
        if (origin === process.env.FRONTEND_URL) {
            callback(null, true);
        }
        else {
            callback(new Error);
        }
    }
};
server.use((0, cors_1.default)(corsOptions));
// leer json
server.use(express_1.default.json());
server.use((0, morgan_1.default)('dev'));
server.use('/api/products', router_1.default);
// Docs
server.use('/docs', swagger_ui_express_1.default.serve, swagger_ui_express_1.default.setup(swagger_1.default, swagger_1.swaggerUiOptions));
/*
server.get( '/api' , ( req , res ) => {
    res.json( { msg : 'Desde API' } )
} )
 */
exports.default = server;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2VydmVyLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vc3JjL3NlcnZlci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQVVBLDhCQVFDO0FBbEJELHNEQUE2QjtBQUM3QixzREFBNkI7QUFDN0IscURBQTRCO0FBQzVCLG9EQUEyQjtBQUMzQixnREFBeUM7QUFDekMsNEVBQWlFO0FBQ2pFLDREQUFnRTtBQUNoRSxvREFBMkI7QUFFM0IsZ0JBQWdCO0FBQ1QsS0FBSyxVQUFVLFNBQVM7SUFDM0IsSUFBRyxDQUFDO1FBQ0EsTUFBTSxZQUFFLENBQUMsWUFBWSxFQUFFLENBQUE7UUFDdkIsWUFBRSxDQUFDLElBQUksRUFBRSxDQUFBO1FBQ1QsNkRBQTZEO0lBQ2pFLENBQUM7SUFBQSxPQUFPLEtBQUssRUFBRSxDQUFDO1FBQ1osT0FBTyxDQUFDLEdBQUcsQ0FBQyxnQkFBTSxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMseUNBQXlDLENBQUMsQ0FBQyxDQUFBO0lBQzNFLENBQUM7QUFDTCxDQUFDO0FBQ0QsU0FBUyxFQUFFLENBQUE7QUFFWCx1QkFBdUI7QUFDdkIsTUFBTSxNQUFNLEdBQUcsSUFBQSxpQkFBTyxHQUFFLENBQUE7QUFFeEIsMkJBQTJCO0FBQzNCLE1BQU0sV0FBVyxHQUFpQjtJQUM5QixNQUFNLEVBQUUsVUFBVSxNQUFNLEVBQUcsUUFBUTtRQUMvQixJQUFJLE1BQU0sS0FBSyxPQUFPLENBQUMsR0FBRyxDQUFDLFlBQVksRUFBRSxDQUFDO1lBQ3RDLFFBQVEsQ0FBRSxJQUFJLEVBQUcsSUFBSSxDQUFDLENBQUE7UUFDMUIsQ0FBQzthQUFJLENBQUM7WUFDRixRQUFRLENBQUUsSUFBSSxLQUFLLENBQUUsQ0FBQTtRQUV6QixDQUFDO0lBRUwsQ0FBQztDQUNKLENBQUE7QUFDRCxNQUFNLENBQUMsR0FBRyxDQUFFLElBQUEsY0FBSSxFQUFFLFdBQVcsQ0FBQyxDQUFFLENBQUE7QUFFaEMsWUFBWTtBQUNaLE1BQU0sQ0FBQyxHQUFHLENBQUUsaUJBQU8sQ0FBQyxJQUFJLEVBQUUsQ0FBRSxDQUFBO0FBRTVCLE1BQU0sQ0FBQyxHQUFHLENBQUUsSUFBQSxnQkFBTSxFQUFDLEtBQUssQ0FBQyxDQUFFLENBQUE7QUFDM0IsTUFBTSxDQUFDLEdBQUcsQ0FBQyxlQUFlLEVBQUUsZ0JBQU0sQ0FBRSxDQUFBO0FBRXBDLE9BQU87QUFDUCxNQUFNLENBQUMsR0FBRyxDQUFFLE9BQU8sRUFBRyw0QkFBUyxDQUFDLEtBQUssRUFBRyw0QkFBUyxDQUFDLEtBQUssQ0FBRSxpQkFBVyxFQUFHLDBCQUFnQixDQUFFLENBQUUsQ0FBQTtBQUUzRjs7OztHQUlHO0FBRUgsa0JBQWUsTUFBTSxDQUFBIn0=