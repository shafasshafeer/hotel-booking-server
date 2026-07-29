import mongoose from 'mongoose';

async function testConnection() {
    try {
        // Hardcoded connection string
        const uri = "mongodb+srv://shafasshafeer_db_user:1G6Epm5YWR3ALMmG@cluster0.bn52hit.mongodb.net/travel-booking?retryWrites=true&w=majority";
        
        console.log('Testing connection...');
        console.log('URI:', uri.replace(/\/\/.*@/, '//****:****@'));
        
        await mongoose.connect(uri);
        console.log('✅ Connected successfully!');
        console.log('Database:', mongoose.connection.name);
        
        // Test a simple operation
        const testCollection = mongoose.connection.collection('test');
        const result = await testCollection.insertOne({ 
            test: 'connection', 
            timestamp: new Date() 
        });
        console.log('✅ Write operation successful!');
        console.log('Inserted ID:', result.insertedId);
        
        await mongoose.disconnect();
        console.log('✅ Test complete!');
    } catch (error) {
        console.error('❌ Error:', error.message);
        if (error.writeConcernError) {
            console.error('Write Concern Error:', error.writeConcernError);
        }
    }
}

testConnection();