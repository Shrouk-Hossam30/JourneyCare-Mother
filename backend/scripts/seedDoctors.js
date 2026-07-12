const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const connectDB = require('../config/db');
const User = require('../modules/auth/user.model');
const Doctor = require('../modules/doctor/doctor.model');

// Sample doctor data with different specialties, experience levels, and locations


const seedDoctorsData = [
  {
    user: {
      fullName: 'Dr. Sarah Connor',
      email: 'sarah.connor@journeycare.com',
      password: 'password123',
      phone: '+1234567890',
      role: 'doctor',
      status: 'active'
    },
    doctor: {
      nationalId: 'NAT-100200300',
      medicalLicense: {
        number: 'LIC-77889900',
        expiryDate: new Date('2030-12-31')
      },
      specialty: 'Pediatrics',
      experience: 8,
      about: 'Dedicated pediatrician specializing in neonatal care and developmental milestones.',
      location: 'New York',
      approvalStatus: 'approved',
      isActive: true,
      consultationFees: {
        visit: 150,
        chat: 30,
        video: 80
      }
    }
  },
  {
    user: {
      fullName: 'Dr. James Carter',
      email: 'james.carter@journeycare.com',
      password: 'password123',
      phone: '+1234567891',
      role: 'doctor',
      status: 'active'
    },
    doctor: {
      nationalId: 'NAT-400500600',
      medicalLicense: {
        number: 'LIC-11223344',
        expiryDate: new Date('2029-06-30')
      },
      specialty: 'Obstetrics & Gynecology',
      experience: 12,
      about: 'Compassionate OB-GYN with extensive experience in high-risk pregnancies and maternal health.',
      location: 'Los Angeles',
      approvalStatus: 'approved',
      isActive: true,
      consultationFees: {
        visit: 200,
        chat: 40,
        video: 100
      }
    }
  },
  {
    user: {
      fullName: 'Dr. Elena Rostova',
      email: 'elena.rostova@journeycare.com',
      password: 'password123',
      phone: '+1234567892',
      role: 'doctor',
      status: 'active'
    },
    doctor: {
      nationalId: 'NAT-700800900',
      medicalLicense: {
        number: 'LIC-55667788',
        expiryDate: new Date('2028-09-15')
      },
      specialty: 'Dermatology',
      experience: 6,
      about: 'Board-certified dermatologist focusing on pediatric skin conditions and prenatal skin care.',
      location: 'Chicago',
      approvalStatus: 'approved',
      isActive: true,
      consultationFees: {
        visit: 120,
        chat: 25,
        video: 70
      }
    }
  },
  {
    user: {
      fullName: 'Dr. Emily Watson',
      email: 'emily.watson@journeycare.com',
      password: 'password123',
      phone: '+1234567893',
      role: 'doctor',
      status: 'active'
    },
    doctor: {
      nationalId: 'NAT-111222333',
      medicalLicense: {
        number: 'LIC-99887766',
        expiryDate: new Date('2031-01-20')
      },
      specialty: 'Psychiatry',
      experience: 10,
      about: 'Specialized in perinatal and postnatal mental health, helping mothers navigate postpartum depression and anxiety.',
      location: 'Boston',
      approvalStatus: 'approved',
      isActive: true,
      consultationFees: {
        visit: 180,
        chat: 50,
        video: 120
      }
    }
  },
  {
    user: {
      fullName: 'Dr. Alan Grant',
      email: 'alan.grant@journeycare.com',
      password: 'password123',
      phone: '+1234567894',
      role: 'doctor',
      status: 'pending'
    },
    doctor: {
      nationalId: 'NAT-444555666',
      medicalLicense: {
        number: 'LIC-22334455',
        expiryDate: new Date('2027-11-11')
      },
      specialty: 'Family Medicine',
      experience: 5,
      about: 'Family medicine physician with a passion for preventative care and community health education.',
      location: 'Houston',
      approvalStatus: 'pending',
      isActive: false,
      consultationFees: {
        visit: 100,
        chat: 20,
        video: 60
      }
    }
  }
];

const seedDB = async () => {
  try {
    // Connect to database
    await connectDB();

    console.log('🧹 Cleaning existing seed doctor and user records...');

    // Find emails of our seed doctors to avoid wiping unrelated database users
    const seedEmails = seedDoctorsData.map(d => d.user.email);

    // Delete doctors first
    const deletedDoctors = await Doctor.deleteMany({ email: { $in: seedEmails } });
    console.log(`🗑️ Deleted ${deletedDoctors.deletedCount} existing Doctor profiles.`);

    // Delete corresponding users
    const deletedUsers = await User.deleteMany({ email: { $in: seedEmails } });
    console.log(`🗑️ Deleted ${deletedUsers.deletedCount} existing User profiles.`);

    console.log('🌱 Seeding doctor data...');

    for (const data of seedDoctorsData) {
      // Hash the password
      const hashedPassword = await bcrypt.hash(data.user.password, 10);

      // Create User
      const user = await User.create({
        fullName: data.user.fullName,
        email: data.user.email,
        password: hashedPassword,
        phone: data.user.phone,
        role: data.user.role,
        status: data.user.status
      });

      // Create Doctor profile linked to User
      await Doctor.create({
        _id: user._id, // Match the user's ID
        userId: user._id,
        name: user.fullName,
        email: user.email,
        password: hashedPassword,
        ...data.doctor
      });

      console.log(`✅ Seeded Doctor: ${user.fullName} (${data.doctor.specialty})`);
    }

    console.log('🎉 Seeding completed successfully!');
  } catch (error) {
    console.error('❌ Error seeding database:', error);
  } finally {
    mongoose.connection.close();
    console.log('🔌 Database connection closed.');
  }
};

seedDB();
