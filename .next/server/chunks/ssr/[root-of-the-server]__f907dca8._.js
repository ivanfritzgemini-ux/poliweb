module.exports = [
"[externals]/stream [external] (stream, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("stream", () => require("stream"));

module.exports = mod;
}),
"[externals]/http [external] (http, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("http", () => require("http"));

module.exports = mod;
}),
"[externals]/url [external] (url, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("url", () => require("url"));

module.exports = mod;
}),
"[externals]/punycode [external] (punycode, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("punycode", () => require("punycode"));

module.exports = mod;
}),
"[externals]/https [external] (https, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("https", () => require("https"));

module.exports = mod;
}),
"[externals]/zlib [external] (zlib, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("zlib", () => require("zlib"));

module.exports = mod;
}),
"[project]/src/lib/supabase.ts [app-rsc] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "supabase",
    ()=>supabase
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$supabase$2f$supabase$2d$js$2f$dist$2f$module$2f$index$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/node_modules/@supabase/supabase-js/dist/module/index.js [app-rsc] (ecmascript) <locals>");
;
const supabaseUrl = ("TURBOPACK compile-time value", "https://wlvscjityfaimzuzcqzb.supabase.co");
const supabaseAnonKey = ("TURBOPACK compile-time value", "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6IndsdnNjaml0eWZhaW16dXpjcXpiIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTc0MTcyMDQsImV4cCI6MjA3Mjk5MzIwNH0.cmtLthBIFYueMyc5mlTGZA7iHl4KAA7l-hIttIRc6E8");
const supabase = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$supabase$2f$supabase$2d$js$2f$dist$2f$module$2f$index$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__$3c$locals$3e$__["createClient"])(supabaseUrl, supabaseAnonKey);
}),
"[project]/src/lib/actions.ts [app-rsc] (ecmascript)", ((__turbopack_context__) => {
"use strict";

/* __next_internal_action_entry_do_not_use__ [{"002d9a1ff16e0c6e7e6935575d2b1a6acdb108f44a":"getCourses","00524684d7079f734fd413a225057615b009443731":"getSexos","00b3365db56babd3b6098379aea9b0546ce5f86af7":"getRoles","4016cf7706a8e3a0909f3a369b71430612112deb5c":"getStaffByRut","4044cd5cf2059f51f23cb03de22a9b926bc2eedba1":"getRoleIdByName","407e4ba96aad76a9487791155a4f634edcb5015a53":"getStudentByRut","40c65d8fa5daf8b6cd87cc78d479ef2e108f08cb02":"addStudent","40dc39ed34aa137806b976b4b9580705bf1dc5368e":"addStaff","60b72c191cb380e4e265af9cd01a22c0c80c7d436a":"createUser","60f1417fa57266eaa8e431f79446cbe1c0b808327c":"updateStudent","702dd697be5ee85e0f73ba948cb73b237413c84cbd":"updateStaff","70a893be4974abf979914475543643232281ea8402":"getStudents","70f12475fe20c3b1d9c185656638a34de0c1ffc307":"getStaff"},"",""] */ __turbopack_context__.s([
    "addStaff",
    ()=>addStaff,
    "addStudent",
    ()=>addStudent,
    "createUser",
    ()=>createUser,
    "getCourses",
    ()=>getCourses,
    "getRoleIdByName",
    ()=>getRoleIdByName,
    "getRoles",
    ()=>getRoles,
    "getSexos",
    ()=>getSexos,
    "getStaff",
    ()=>getStaff,
    "getStaffByRut",
    ()=>getStaffByRut,
    "getStudentByRut",
    ()=>getStudentByRut,
    "getStudents",
    ()=>getStudents,
    "updateStaff",
    ()=>updateStaff,
    "updateStudent",
    ()=>updateStudent
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$server$2d$reference$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/build/webpack/loaders/next-flight-loader/server-reference.js [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$supabase$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/supabase.ts [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$action$2d$validate$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/build/webpack/loaders/next-flight-loader/action-validate.js [app-rsc] (ecmascript)");
;
;
async function getStaff(page = 1, pageSize = 10, status) {
    const rangeFrom = (page - 1) * pageSize;
    const rangeTo = page * pageSize - 1;
    let query = __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$supabase$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["supabase"].from('usuarios').select('id, rut, nombres, apellidos, email, status, fecha_nacimiento, sexo(id, nombre), role:roles(id, nombre_rol)', {
        count: 'exact'
    });
    if (status) {
        query = query.eq('status', status);
    }
    query = query.order('rut', {
        ascending: true
    });
    if (pageSize !== 0) {
        query = query.range(rangeFrom, rangeTo);
    }
    const { data, error, count } = await query;
    if (error) {
        console.error('Error fetching staff:', error);
        throw new Error('Could not fetch staff data.');
    }
    return {
        staff: data,
        totalCount: count || 0
    };
}
async function getSexos() {
    const { data, error } = await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$supabase$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["supabase"].from('sexo').select('id, nombre');
    if (error) {
        console.error('Error fetching sexos:', error);
        throw new Error('Could not fetch sexos data.');
    }
    return data.map((sexo)=>({
            ...sexo,
            id: String(sexo.id)
        }));
}
async function getRoles() {
    const { data, error } = await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$supabase$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["supabase"].from('roles').select('id, nombre_rol');
    if (error) {
        console.error('Error fetching roles:', error);
        throw new Error('Could not fetch roles data.');
    }
    return data.map((role)=>({
            ...role,
            id: String(role.id)
        }));
}
async function getRoleIdByName(roleName) {
    const { data, error } = await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$supabase$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["supabase"].from('roles').select('id').eq('nombre_rol', roleName).single();
    if (error && error.code !== 'PGRST116') {
        console.error(`Error fetching role ID for ${roleName}:`, error);
        throw new Error(`Could not fetch role ID for ${roleName}.`);
    }
    return data ? String(data.id) : null;
}
async function addStaff(formData) {
    const { email, password, ...rest } = formData;
    const { data: authData, error: authError } = await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$supabase$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["supabase"].auth.signUp({
        email,
        password
    });
    if (authError) {
        console.error('Error signing up user:', authError);
        throw new Error(authError.message);
    }
    const { data, error } = await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$supabase$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["supabase"].from('usuarios').insert({
        id: authData.user?.id,
        rut: rest.rut,
        nombres: rest.nombres,
        apellidos: rest.apellidos,
        sexo_id: rest.sexo_id,
        email: email,
        rol_id: rest.rol_id,
        fecha_nacimiento: rest.fecha_nacimiento,
        telefono: rest.telefono || null,
        direccion: rest.direccion || null
    }).select('id, rut, nombres, apellidos, email, status, sexo(id, nombre), role:roles(id, nombre_rol)').single();
    if (error) {
        console.error('Error inserting staff data:', error);
        throw new Error(error.message);
    }
    return data;
}
async function updateStaff(rut, updates, userId) {
    const { email, password, ...profileUpdates } = updates;
    // 1. Update Supabase Auth if email or password are provided
    if (email || password) {
        const authUpdates = {};
        if (email) authUpdates.email = email;
        if (password) authUpdates.password = password;
        if (!userId) {
            throw new Error('User ID is required to update email or password.');
        }
        const { data: authData, error: authError } = await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$supabase$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["supabase"].auth.admin.updateUserById(userId, authUpdates);
        if (authError) {
            console.error('Error updating auth user:', authError);
            throw new Error(authError.message);
        }
        // If email was changed, update it in the profile table as well
        if (email) {
            profileUpdates.email = email;
        }
    }
    // 2. Update the public.usuarios table
    const { data, error } = await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$supabase$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["supabase"].from('usuarios').update(profileUpdates).eq('rut', rut);
    if (error) {
        console.error('Error updating staff data:', error);
        throw new Error(error.message);
    }
    return data;
}
async function getStaffByRut(rut) {
    const { data, error } = await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$supabase$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["supabase"].from('usuarios').select('id, rut, nombres, apellidos, email, status, sexo(id, nombre), role:roles(id, nombre_rol), telefono, direccion, fecha_nacimiento').eq('rut', rut).single();
    if (error && error.code !== 'PGRST116') {
        console.error('Error fetching staff by RUT:', error);
        throw new Error('No se pudo buscar el personal por RUT.');
    }
    return data;
}
async function getStudentByRut(rut) {
    const { data: user, error: userError } = await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$supabase$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["supabase"].from('usuarios').select('id').eq('rut', rut).single();
    if (userError && userError.code !== 'PGRST116') {
        console.error('Error fetching user by RUT:', userError);
        throw new Error('No se pudo buscar el usuario por RUT.');
    }
    if (!user) {
        return null; // User does not exist
    }
    const { data: student, error: studentError } = await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$supabase$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["supabase"].from('estudiantes_detalles').select('nro_registro').eq('id', user.id).single();
    if (studentError && studentError.code !== 'PGRST116') {
        console.error('Error fetching student details:', studentError);
        throw new Error('No se pudo buscar los detalles del estudiante.');
    }
    return student;
}
async function getStudents(page = 1, pageSize = 10, orderBy = {
    column: 'nro_registro',
    ascending: true
}) {
    const rangeFrom = (page - 1) * pageSize;
    const rangeTo = page * pageSize - 1;
    let query = __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$supabase$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["supabase"].from('estudiantes_detalles').select('nro_registro, fecha_matricula, fecha_retiro, curso:cursos(id, nivel, letra), usuario:usuarios(id, rut, nombres, apellidos, fecha_nacimiento, sexo:sexo(id, nombre), email, telefono, direccion)', {
        count: 'exact'
    });
    if (orderBy) {
        query = query.order(orderBy.column, {
            ascending: orderBy.ascending
        });
    }
    if (pageSize !== 0) {
        query = query.range(rangeFrom, rangeTo);
    }
    const { data, error, count } = await query;
    if (error) {
        console.error('Error fetching students:', error);
        throw new Error('Could not fetch student data.');
    }
    const students = data.map((s)=>{
        const student = {
            ...s.usuario,
            ...s,
            id: s.nro_registro,
            userId: s.usuario.id,
            grade: s.curso?.nivel ? `${s.curso.nivel}º Medio ${s.curso.letra}` : null,
            enrollmentDate: s.fecha_matricula
        };
        student.sexo = s.usuario.sexo;
        student.curso = s.curso;
        return student;
    });
    return {
        students,
        totalCount: count || 0
    };
}
async function getCourses() {
    const { data, error } = await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$supabase$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["supabase"].from('cursos').select('id, nivel, letra');
    if (error) {
        console.error('Error fetching courses:', error);
        throw new Error('Could not fetch courses data.');
    }
    return data.map((curso)=>({
            id: String(curso.id),
            nombre: `${curso.nivel}º Medio ${curso.letra}`
        }));
}
async function createUser(userData, rol_id = null) {
    const { email, password, ...rest } = userData;
    // Generate a random password if not provided
    const userPassword = password || Math.random().toString(36).substring(2, 15);
    const { data: authData, error: authError } = await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$supabase$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["supabase"].auth.signUp({
        email,
        password: userPassword
    });
    if (authError) {
        console.error('Error signing up user:', authError);
        throw new Error(authError.message);
    }
    const { data, error } = await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$supabase$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["supabase"].from('usuarios').insert({
        id: authData.user?.id,
        rut: rest.rut,
        nombres: rest.nombres,
        apellidos: rest.apellidos,
        sexo_id: rest.sexo_id,
        email: email,
        fecha_nacimiento: rest.fecha_nacimiento,
        telefono: rest.phone || null,
        direccion: rest.address || null,
        rol_id: rol_id
    }).select('id').single();
    if (error) {
        console.error('Error inserting user data:', error);
        throw new Error(error.message);
    }
    return data.id; // Return the new user's ID
}
async function addStudent(studentData) {
    // This function now only inserts into 'estudiantes_detalles'
    // It assumes the user (identified by RUT) already exists in the 'usuarios' table.
    const { data, error } = await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$supabase$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["supabase"].from('estudiantes_detalles').insert([
        {
            id: studentData.usuario,
            nro_registro: studentData.id,
            curso_id: studentData.curso_id,
            fecha_matricula: studentData.enrollmentDate
        }
    ]).select().single();
    if (error) {
        console.error('Error inserting student data:', error);
        throw new Error(error.message);
    }
    return data;
}
async function updateStudent(userId, updates) {
    const { // Fields for 'usuarios' table
    nombres, apellidos, sexo_id, fecha_nacimiento, telefono, direccion, // Fields for 'estudiantes_detalles' table
    curso_id, fecha_matricula, fecha_retiro } = updates;
    // 1. Update the 'usuarios' table
    const { error: userError } = await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$supabase$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["supabase"].from('usuarios').update({
        nombres,
        apellidos,
        sexo_id,
        fecha_nacimiento,
        telefono,
        direccion
    }).eq('id', userId);
    if (userError) {
        console.error('Error updating student user data:', userError);
        throw new Error('Could not update student user data.');
    }
    // 2. Update the 'estudiantes_detalles' table
    const { error: studentDetailsError } = await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$supabase$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["supabase"].from('estudiantes_detalles').update({
        curso_id,
        fecha_matricula,
        fecha_retiro
    }).eq('id', userId);
    if (studentDetailsError) {
        console.error('Error updating student details:', studentDetailsError);
        throw new Error('Could not update student details.');
    }
    // 3. Fetch and return the updated student data
    const { data: updatedStudent, error: fetchError } = await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$supabase$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["supabase"].from('estudiantes_detalles').select('nro_registro, fecha_matricula, fecha_retiro, curso:cursos(id, nivel, letra), usuario:usuarios(id, rut, nombres, apellidos, fecha_nacimiento, sexo:sexo(id, nombre), email, telefono, direccion)').eq('id', userId).single();
    if (fetchError) {
        console.error('Error fetching updated student data:', fetchError);
        throw new Error('Could not fetch updated student data.');
    }
    const mappedStudent = {
        ...updatedStudent.usuario,
        ...updatedStudent,
        id: updatedStudent.nro_registro,
        userId: updatedStudent.usuario.id,
        grade: updatedStudent.curso?.nivel ? `${updatedStudent.curso.nivel}º Medio ${updatedStudent.curso.letra}` : null,
        enrollmentDate: updatedStudent.fecha_matricula
    };
    mappedStudent.sexo = updatedStudent.usuario.sexo;
    mappedStudent.curso = updatedStudent.curso;
    return mappedStudent;
}
;
(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$action$2d$validate$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["ensureServerEntryExports"])([
    getStaff,
    getSexos,
    getRoles,
    getRoleIdByName,
    addStaff,
    updateStaff,
    getStaffByRut,
    getStudentByRut,
    getStudents,
    getCourses,
    createUser,
    addStudent,
    updateStudent
]);
(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$server$2d$reference$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["registerServerReference"])(getStaff, "70f12475fe20c3b1d9c185656638a34de0c1ffc307", null);
(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$server$2d$reference$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["registerServerReference"])(getSexos, "00524684d7079f734fd413a225057615b009443731", null);
(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$server$2d$reference$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["registerServerReference"])(getRoles, "00b3365db56babd3b6098379aea9b0546ce5f86af7", null);
(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$server$2d$reference$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["registerServerReference"])(getRoleIdByName, "4044cd5cf2059f51f23cb03de22a9b926bc2eedba1", null);
(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$server$2d$reference$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["registerServerReference"])(addStaff, "40dc39ed34aa137806b976b4b9580705bf1dc5368e", null);
(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$server$2d$reference$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["registerServerReference"])(updateStaff, "702dd697be5ee85e0f73ba948cb73b237413c84cbd", null);
(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$server$2d$reference$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["registerServerReference"])(getStaffByRut, "4016cf7706a8e3a0909f3a369b71430612112deb5c", null);
(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$server$2d$reference$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["registerServerReference"])(getStudentByRut, "407e4ba96aad76a9487791155a4f634edcb5015a53", null);
(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$server$2d$reference$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["registerServerReference"])(getStudents, "70a893be4974abf979914475543643232281ea8402", null);
(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$server$2d$reference$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["registerServerReference"])(getCourses, "002d9a1ff16e0c6e7e6935575d2b1a6acdb108f44a", null);
(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$server$2d$reference$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["registerServerReference"])(createUser, "60b72c191cb380e4e265af9cd01a22c0c80c7d436a", null);
(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$server$2d$reference$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["registerServerReference"])(addStudent, "40c65d8fa5daf8b6cd87cc78d479ef2e108f08cb02", null);
(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$server$2d$reference$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["registerServerReference"])(updateStudent, "60f1417fa57266eaa8e431f79446cbe1c0b808327c", null);
}),
"[project]/.next-internal/server/app/staff/page/actions.js { ACTIONS_MODULE0 => \"[project]/src/lib/actions.ts [app-rsc] (ecmascript)\" } [app-rsc] (server actions loader, ecmascript) <locals>", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([]);
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$actions$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/actions.ts [app-rsc] (ecmascript)");
;
;
;
;
;
}),
"[project]/.next-internal/server/app/staff/page/actions.js { ACTIONS_MODULE0 => \"[project]/src/lib/actions.ts [app-rsc] (ecmascript)\" } [app-rsc] (server actions loader, ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "00524684d7079f734fd413a225057615b009443731",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$actions$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["getSexos"],
    "00b3365db56babd3b6098379aea9b0546ce5f86af7",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$actions$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["getRoles"],
    "40dc39ed34aa137806b976b4b9580705bf1dc5368e",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$actions$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["addStaff"],
    "702dd697be5ee85e0f73ba948cb73b237413c84cbd",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$actions$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["updateStaff"],
    "70f12475fe20c3b1d9c185656638a34de0c1ffc307",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$actions$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["getStaff"]
]);
var __TURBOPACK__imported__module__$5b$project$5d2f2e$next$2d$internal$2f$server$2f$app$2f$staff$2f$page$2f$actions$2e$js__$7b$__ACTIONS_MODULE0__$3d3e$__$225b$project$5d2f$src$2f$lib$2f$actions$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$2922$__$7d$__$5b$app$2d$rsc$5d$__$28$server__actions__loader$2c$__ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i('[project]/.next-internal/server/app/staff/page/actions.js { ACTIONS_MODULE0 => "[project]/src/lib/actions.ts [app-rsc] (ecmascript)" } [app-rsc] (server actions loader, ecmascript) <locals>');
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$actions$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/actions.ts [app-rsc] (ecmascript)");
}),
"[project]/src/app/favicon.ico.mjs { IMAGE => \"[project]/src/app/favicon.ico (static in ecmascript)\" } [app-rsc] (structured image object, ecmascript, Next.js Server Component)", ((__turbopack_context__) => {

__turbopack_context__.n(__turbopack_context__.i("[project]/src/app/favicon.ico.mjs { IMAGE => \"[project]/src/app/favicon.ico (static in ecmascript)\" } [app-rsc] (structured image object, ecmascript)"));
}),
"[project]/src/app/layout.tsx [app-rsc] (ecmascript, Next.js Server Component)", ((__turbopack_context__) => {

__turbopack_context__.n(__turbopack_context__.i("[project]/src/app/layout.tsx [app-rsc] (ecmascript)"));
}),
"[project]/src/components/StaffList.tsx [app-rsc] (client reference proxy) <module evaluation>", ((__turbopack_context__) => {
"use strict";

// This file is generated by next-core EcmascriptClientReferenceModule.
__turbopack_context__.s([
    "StaffList",
    ()=>StaffList
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$server$2d$dom$2d$turbopack$2d$server$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/rsc/react-server-dom-turbopack-server.js [app-rsc] (ecmascript)");
;
const StaffList = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$server$2d$dom$2d$turbopack$2d$server$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["registerClientReference"])(function() {
    throw new Error("Attempted to call StaffList() from the server but StaffList is on the client. It's not possible to invoke a client function from the server, it can only be rendered as a Component or passed to props of a Client Component.");
}, "[project]/src/components/StaffList.tsx <module evaluation>", "StaffList");
}),
"[project]/src/components/StaffList.tsx [app-rsc] (client reference proxy)", ((__turbopack_context__) => {
"use strict";

// This file is generated by next-core EcmascriptClientReferenceModule.
__turbopack_context__.s([
    "StaffList",
    ()=>StaffList
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$server$2d$dom$2d$turbopack$2d$server$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/rsc/react-server-dom-turbopack-server.js [app-rsc] (ecmascript)");
;
const StaffList = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$server$2d$dom$2d$turbopack$2d$server$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["registerClientReference"])(function() {
    throw new Error("Attempted to call StaffList() from the server but StaffList is on the client. It's not possible to invoke a client function from the server, it can only be rendered as a Component or passed to props of a Client Component.");
}, "[project]/src/components/StaffList.tsx", "StaffList");
}),
"[project]/src/components/StaffList.tsx [app-rsc] (ecmascript)", ((__turbopack_context__) => {
"use strict";

var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$StaffList$2e$tsx__$5b$app$2d$rsc$5d$__$28$client__reference__proxy$29$__$3c$module__evaluation$3e$__ = __turbopack_context__.i("[project]/src/components/StaffList.tsx [app-rsc] (client reference proxy) <module evaluation>");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$StaffList$2e$tsx__$5b$app$2d$rsc$5d$__$28$client__reference__proxy$29$__ = __turbopack_context__.i("[project]/src/components/StaffList.tsx [app-rsc] (client reference proxy)");
;
__turbopack_context__.n(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$StaffList$2e$tsx__$5b$app$2d$rsc$5d$__$28$client__reference__proxy$29$__);
}),
"[project]/src/app/staff/page.tsx [app-rsc] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>StaffPage
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/rsc/react-jsx-dev-runtime.js [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$StaffList$2e$tsx__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/StaffList.tsx [app-rsc] (ecmascript)");
;
;
function StaffPage() {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "space-y-6",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "flex flex-col space-y-1",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("h1", {
                        className: "text-3xl font-headline font-bold text-primary",
                        children: "Gestión de Personal"
                    }, void 0, false, {
                        fileName: "[project]/src/app/staff/page.tsx",
                        lineNumber: 7,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                        className: "text-muted-foreground",
                        children: "Añada nuevos miembros del personal y gestione las cuentas existentes."
                    }, void 0, false, {
                        fileName: "[project]/src/app/staff/page.tsx",
                        lineNumber: 8,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/app/staff/page.tsx",
                lineNumber: 6,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$StaffList$2e$tsx__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["StaffList"], {}, void 0, false, {
                fileName: "[project]/src/app/staff/page.tsx",
                lineNumber: 10,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/src/app/staff/page.tsx",
        lineNumber: 5,
        columnNumber: 5
    }, this);
}
}),
"[project]/src/app/staff/page.tsx [app-rsc] (ecmascript, Next.js Server Component)", ((__turbopack_context__) => {

__turbopack_context__.n(__turbopack_context__.i("[project]/src/app/staff/page.tsx [app-rsc] (ecmascript)"));
}),
"[externals]/next/dist/shared/lib/no-fallback-error.external.js [external] (next/dist/shared/lib/no-fallback-error.external.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/shared/lib/no-fallback-error.external.js", () => require("next/dist/shared/lib/no-fallback-error.external.js"));

module.exports = mod;
}),
];

//# sourceMappingURL=%5Broot-of-the-server%5D__f907dca8._.js.map