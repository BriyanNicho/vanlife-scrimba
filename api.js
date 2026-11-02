import { createClient } from "@supabase/supabase-js"

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || ""
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || ""

export const supabase = createClient(supabaseUrl, supabaseAnonKey)

export async function getVans() {
    const { data, error } = await supabase
        .from("vans")
        .select("*")

    if (error) {
        throw {
            message: error.message,
            statusText: error.details,
            status: error.code
        }
    }

    return data
}

export async function getVan(id) {
    const { data, error } = await supabase
        .from("vans")
        .select("*")
        .eq("id", id)
        .single()

    if (error) {
        throw {
            message: error.message,
            statusText: error.details,
            status: error.code
        }
    }

    return data
}

export async function getHostVans(id) {
    let query = supabase
        .from("vans")
        .select("*")
        .eq("hostId", "123")

    if (id) {
        query = query.eq("id", id).single()
    }

    const { data, error } = await query

    if (error) {
        throw {
            message: error.message,
            statusText: error.details,
            status: error.code
        }
    }

    return data
}

export async function loginUser(creds) {
    const { data, error } = await supabase.auth.signInWithPassword({
        email: creds.email,
        password: creds.password,
    })

    if (error) {
        throw {
            message: error.message,
            statusText: "Unauthorized",
            status: error.status || 401
        }
    }

    return data
}
