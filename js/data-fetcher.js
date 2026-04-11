/**
 * JPL Horizons Data Fetcher
 * Retrieves real-time planetary positions from NASA API
 */

const JPL_BASE_URL = "https://ssd.jpl.nasa.gov/api/horizons.api";

class JPLDataFetcher {
    constructor() {
        this.cache = {}; // Cache results for the current hour
    }

    /**
     * Get position of a planet relative to the Sun (500@10)
     * @param {string} planetId - JPL ID (e.g., '399' for Earth)
     * @returns {Promise<Object>} - {x, y, z} in AU
     */
    async getPlanetPosition(planetId) {
        const now = new Date();
        const hourKey = `${now.getFullYear()}-${now.getMonth()}-${now.getDate()}-${now.getHours()}`;
        const cacheKey = `${planetId}_${hourKey}`;

        if (this.cache[cacheKey]) {
            return this.cache[cacheKey];
        }

        // We fetch for exactly 'now'
        const startTime = now.toISOString().split('T')[0];
        const stopTime = new Date(now.getTime() + 86400000).toISOString().split('T')[0];

        const params = new URLSearchParams({
            format: 'json',
            COMMAND: planetId,
            OBJ_DATA: 'NO',
            MAKE_EPHEM: 'YES',
            EPHEM_TYPE: 'VECTORS',
            CENTER: '500@10',
            START_TIME: startTime,
            STOP_TIME: stopTime,
            STEP_SIZE: '1 d',
            VEC_TABLE: '1' // Basic vectors
        });

        try {
            const response = await fetch(`${JPL_BASE_URL}?${params.toString()}`);
            const data = await response.json();
            
            if (data.result) {
                const vector = this.parseJPLResult(data.result);
                if (vector) {
                    this.cache[cacheKey] = vector;
                    return vector;
                }
            }
            throw new Error(`Failed to parse JPL data for ${planetId}`);
        } catch (error) {
            console.error(`JPL Fetch Error (${planetId}):`, error);
            return null; // Fallback to calculated orbit
        }
    }

    /**
     * Parses the JPL text result to extract X, Y, Z
     */
    parseJPLResult(text) {
        // JPL returns a block of text, look for the data section between $$SOE and $$EOE
        const soeIndex = text.indexOf('$$SOE');
        const eoeIndex = text.indexOf('$$EOE');
        
        if (soeIndex === -1 || eoeIndex === -1) return null;
        
        const dataSection = text.substring(soeIndex + 5, eoeIndex).trim();
        const lines = dataSection.split('\n');
        
        // The first line usually contains the vector data for the start time
        // Format is often: JD, Date, X, Y, Z, VX, VY, VZ, LT, RG, RR
        // We only need X, Y, Z (which are in columns 3, 4, 5)
        const parts = lines[0].split(',').map(p => p.trim());
        
        if (parts.length >= 5) {
            return {
                x: parseFloat(parts[2]),
                y: parseFloat(parts[3]),
                z: parseFloat(parts[4])
            };
        }
        
        return null;
    }
}

window.JPLFetcher = new JPLDataFetcher();
