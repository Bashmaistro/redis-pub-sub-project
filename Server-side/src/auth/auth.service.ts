import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-auth.dto';
import {  UpdateUserDto } from './dto/update-auth.dto';
import { User } from './entities/auth.entity';
import { InjectModel } from '@nestjs/mongoose';
import { AuthDto } from './dto/auth.dto';
import {Model} from 'mongoose';
import { JwtService } from '@nestjs/jwt';




@Injectable()
export class AuthService {

  constructor(@InjectModel(User.name) private authModel: Model<User>,private jwtService: JwtService ){}

  async create(createAuthDto: CreateUserDto) {

    console.log("girdi");
    

    const user = new this.authModel(createAuthDto);
    const savedUser = await user.save();
    return savedUser.toObject();
  }



  async findByUsername(username: string){
    const findUser = await this.authModel.findOne({
      username:username
    })

    return findUser;
  }



  

  
  
  async validateUser(authPayloadDto : AuthDto){

    const findUser = await this.authModel.findOne({email: authPayloadDto.email})

    if (findUser && (findUser.password === authPayloadDto.password)) {
        
        const {password, ...user } = findUser;
        return this.jwtService.sign(user);

    }else{
        return findUser;
    }

}
}
